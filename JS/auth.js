(function () {
    "use strict";

    const AUTH_KEY = "brewBloomAuthenticated";
    const USER_KEY = "brewBloomUsername";
    const ACCOUNT_ID_KEY = "brewBloomAccountId";
    const ACCOUNTS_KEY = "brewBloomAccounts";
    const REGISTERED_NOTICE_KEY = "brewBloomRegisteredNotice";
    const HASH_ITERATIONS = 210000;
    const encoder = new TextEncoder();
    const registrationsInProgress = new Set();

    function bytesToHex(bytes) {
        return Array.from(bytes, function (byte) {
            return byte.toString(16).padStart(2, "0");
        }).join("");
    }

    function hexToBytes(hex) {
        if (typeof hex !== "string" || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) {
            return null;
        }

        return Uint8Array.from(hex.match(/.{2}/g), function (byte) {
            return Number.parseInt(byte, 16);
        });
    }

    function constantTimeEqual(left, right) {
        if (!left || !right || left.length !== right.length) {
            return false;
        }

        let difference = 0;
        for (let index = 0; index < left.length; index += 1) {
            difference |= left[index] ^ right[index];
        }
        return difference === 0;
    }

    async function derivePasswordHash(password, salt) {
        const passwordKey = await crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            "PBKDF2",
            false,
            ["deriveBits"]
        );
        const derivedBits = await crypto.subtle.deriveBits({
            name: "PBKDF2",
            salt: salt,
            iterations: HASH_ITERATIONS,
            hash: "SHA-256"
        }, passwordKey, 256);

        return new Uint8Array(derivedBits);
    }

    function createSalt() {
        const salt = new Uint8Array(16);
        crypto.getRandomValues(salt);
        return salt;
    }

    function createAccountId() {
        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }

        const randomId = new Uint8Array(16);
        crypto.getRandomValues(randomId);
        return bytesToHex(randomId);
    }

    function getAccounts() {
        try {
            const storedAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
            return Array.isArray(storedAccounts) ? storedAccounts : [];
        } catch (error) {
            return [];
        }
    }

    function showRegisterMessage(message, isError) {
        const feedback = document.getElementById("registerSuccess");

        if (!feedback) {
            return;
        }

        feedback.textContent = message;
        feedback.classList.remove("d-none", "alert-success", "alert-danger");
        feedback.classList.add(isError ? "alert-danger" : "alert-success");
    }

    function showLoginError(message) {
        const alert = document.getElementById("loginAlert");

        if (!alert) {
            return;
        }

        alert.textContent = message;
        alert.classList.remove("d-none", "alert-success");
        alert.classList.add("alert-danger");
    }

    function showLoginMessage(message, isError) {
        const alert = document.getElementById("loginAlert");

        if (!alert) {
            return;
        }

        alert.textContent = message;
        alert.classList.remove("d-none", "alert-success", "alert-danger");
        alert.classList.add(isError ? "alert-danger" : "alert-success");
    }

    function clearLoginFields() {
        const loginForm = document.getElementById("loginForm");

        if (!loginForm) {
            return;
        }

        loginForm.reset();
        loginForm.elements.username.value = "";
        loginForm.elements.password.value = "";
    }

    window.BrewBloomAuth = {
        register: async function (name, email, password) {
            const normalizedEmail = email.trim().toLowerCase();
            const accounts = getAccounts();

            const emailAlreadyExists = function (accountList) {
                return accountList.some(function (account) {
                return typeof account.email === "string" && account.email.trim().toLowerCase() === normalizedEmail;
                });
            };

            if (emailAlreadyExists(accounts) || registrationsInProgress.has(normalizedEmail)) {
                showRegisterMessage("An account with this email already exists. Please log in or use a different email.", true);
                return false;
            }

            registrationsInProgress.add(normalizedEmail);
            try {
                if (!crypto.subtle) {
                    throw new Error("Secure password hashing is unavailable.");
                }

                const salt = createSalt();
                const passwordHash = await derivePasswordHash(password, salt);
                const latestAccounts = getAccounts();

                if (emailAlreadyExists(latestAccounts)) {
                    showRegisterMessage("An account with this email already exists. Please log in or use a different email.", true);
                    return false;
                }

                latestAccounts.push({
                    id: createAccountId(),
                    name: name.trim(),
                    email: normalizedEmail,
                    passwordSalt: bytesToHex(salt),
                    passwordHash: bytesToHex(passwordHash),
                    hashIterations: HASH_ITERATIONS
                });
                localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(latestAccounts));
            } catch (error) {
                showRegisterMessage("We could not securely create your account in this browser. Open the site over HTTPS and try again.", true);
                return false;
            } finally {
                registrationsInProgress.delete(normalizedEmail);
            }

            sessionStorage.setItem(REGISTERED_NOTICE_KEY, "Account created. Log in with your email address and password.");
            window.location.assign("login.php");
            return true;
        },

        login: async function (email, password) {
            if (!crypto.subtle) {
                showLoginError("Secure sign-in is unavailable. Open the site over HTTPS and try again.");
                return false;
            }

            const normalizedEmail = email.trim().toLowerCase();
            const accounts = getAccounts();
            let authenticatedAccount = null;

            try {
                for (const account of accounts) {
                    if (typeof account.email !== "string" || account.email.trim().toLowerCase() !== normalizedEmail) {
                        continue;
                    }

                    const salt = hexToBytes(account.passwordSalt);
                    const expectedHash = hexToBytes(account.passwordHash);
                    if (salt && expectedHash && account.hashIterations === HASH_ITERATIONS) {
                        const actualHash = await derivePasswordHash(password, salt);
                        if (constantTimeEqual(actualHash, expectedHash)) {
                            authenticatedAccount = account;
                        }
                    } else if (typeof account.password === "string" && account.password === password) {
                        const newSalt = createSalt();
                        const upgradedHash = await derivePasswordHash(password, newSalt);
                        account.passwordSalt = bytesToHex(newSalt);
                        account.passwordHash = bytesToHex(upgradedHash);
                        account.hashIterations = HASH_ITERATIONS;
                        delete account.password;
                        authenticatedAccount = account;
                        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
                    }

                    break;
                }
            } catch (error) {
                showLoginError("We could not verify your account securely. Please try again.");
                return false;
            }

            if (!authenticatedAccount) {
                showLoginError("That email address and password do not match. Please try again.");
                return false;
            }

            const accountId = authenticatedAccount.id || createAccountId();
            authenticatedAccount.id = accountId;
            localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
            sessionStorage.setItem(AUTH_KEY, "true");
            sessionStorage.setItem(ACCOUNT_ID_KEY, accountId);
            sessionStorage.setItem(USER_KEY, authenticatedAccount.name);
            window.location.assign("index.php");
            return true;
        }
    };

    clearLoginFields();
    window.addEventListener("pageshow", clearLoginFields);

    document.addEventListener("DOMContentLoaded", function () {
        clearLoginFields();
        const registeredNotice = sessionStorage.getItem(REGISTERED_NOTICE_KEY);
        if (registeredNotice && document.getElementById("loginForm")) {
            const alert = document.getElementById("loginAlert");
            showLoginMessage(registeredNotice, false);
            sessionStorage.removeItem(REGISTERED_NOTICE_KEY);
        }

        if (!document.body.classList.contains("landing-page")) {
            return;
        }

        const accountId = sessionStorage.getItem(ACCOUNT_ID_KEY);
        const accountIsValid = getAccounts().some(function (account) {
            return account.id === accountId;
        });

        if (sessionStorage.getItem(AUTH_KEY) !== "true" || !accountId || !accountIsValid) {
            window.location.replace("login.php");
            return;
        }

        const username = sessionStorage.getItem(USER_KEY) || "";
        const welcomeUser = document.getElementById("welcomeUser");
        const logoutButton = document.getElementById("logoutBtn");

        if (welcomeUser) {
            welcomeUser.textContent = username;
        }

        if (logoutButton) {
            logoutButton.addEventListener("click", function () {
                sessionStorage.removeItem(AUTH_KEY);
                sessionStorage.removeItem(USER_KEY);
                sessionStorage.removeItem(ACCOUNT_ID_KEY);
                window.location.replace("login.php");
            });
        }
    });
}());