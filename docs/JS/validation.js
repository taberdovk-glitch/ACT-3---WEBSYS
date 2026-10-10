(function ($) {
    "use strict";

    function showUnavailableMessage(form) {
        const feedback = form.id === "loginForm"
            ? document.getElementById("loginAlert")
            : document.getElementById("registerSuccess");

        if (!feedback) {
            return;
        }

        feedback.textContent = "Form validation is unavailable. Please reload the page and try again.";
        feedback.classList.remove("d-none", "alert-success");
        feedback.classList.add("alert-danger");
    }

    if (!$ || !$.validator) {
        document.querySelectorAll("#loginForm, #registerForm").forEach(function (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                showUnavailableMessage(form);
            });
        });
        return;
    }

    $.validator.setDefaults({
        errorElement: "span",
        errorClass: "validation-error",
        highlight: function (element) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        },
        unhighlight: function (element) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-glass"));
        }
    });

    $(function () {
        const loginForm = document.getElementById("loginForm");
        const registerForm = document.getElementById("registerForm");

        if (loginForm) {
            $(loginForm).validate({
                rules: {
                    username: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    username: {
                        required: "Please enter your email address.",
                        email: "Please enter a valid email address."
                    },
                    password: "Please enter your password."
                },
                submitHandler: function (form) {
                    const username = form.elements.username.value.trim();
                    const password = form.elements.password.value;

                    if (window.BrewBloomAuth) {
                        window.BrewBloomAuth.login(username, password);
                    }

                    return false;
                }
            });
        }

        if (registerForm) {
            $(registerForm).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    regPassword: {
                        required: true,
                        minlength: 8
                    },
                    confirmPassword: {
                        required: true,
                        equalTo: "#regPassword"
                    }
                },
                messages: {
                    name: {
                        required: "Please enter your name.",
                        minlength: "Your name must be at least 2 characters."
                    },
                    email: {
                        required: "Please enter your email address.",
                        email: "Please enter a valid email address."
                    },
                    regPassword: {
                        required: "Please create a password.",
                        minlength: "Use at least 8 characters for your password."
                    },
                    confirmPassword: {
                        required: "Please confirm your password.",
                        equalTo: "Your passwords do not match."
                    }
                },
                submitHandler: function (form) {
                    const name = form.elements.name.value.trim();

                    if (window.BrewBloomAuth) {
                        window.BrewBloomAuth.register(
                            name,
                            form.elements.email.value,
                            form.elements.regPassword.value
                        );
                    }

                    return false;
                }
            });
        }
    });
}(window.jQuery));