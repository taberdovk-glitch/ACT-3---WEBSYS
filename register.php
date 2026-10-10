<?php
session_start();

if (!empty($_SESSION['auth']) && $_SESSION['auth'] === true) {
    header('Location: index.php');
    exit;
}

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['regPassword'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    if ($name === '' || !preg_match('/^[A-Za-z\s\'-]{2,50}$/', $name)) {
        $errors[] = 'Please enter a valid full name with at least 2 letters.';
    }

    if ($email === '' || !preg_match('/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/', $email)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if ($password === '' || !preg_match('/^(?=.*[A-Za-z])(?=.*\d).{8,}$/', $password)) {
        $errors[] = 'Password must be at least 8 characters and include letters and numbers.';
    }

    if ($confirmPassword === '' || $password !== $confirmPassword) {
        $errors[] = 'Passwords do not match.';
    }

    if (empty($errors)) {
        $usersFile = __DIR__ . '/data/users.json';
        $users = file_exists($usersFile) ? json_decode((string) file_get_contents($usersFile), true) : [];
        $users = is_array($users) ? $users : [];

        foreach ($users as $user) {
            if (isset($user['email']) && strtolower(trim($user['email'])) === strtolower($email)) {
                $errors[] = 'An account with this email already exists.';
                break;
            }
        }

        if (empty($errors)) {
            $users[] = [
                'name' => $name,
                'email' => strtolower($email),
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
            ];

            file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            $_SESSION['register_success'] = 'Account created successfully. Please log in.';
            header('Location: login.php');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calle Hiraya Café Registration">
    <title>Calle Hiraya Café | Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="auth-page register-bg">
    <main class="auth-wrapper register-wrapper">
        <section class="glass-auth-card register-glass-card" aria-labelledby="registerTitle">
            <div class="auth-logo" aria-hidden="true">☕</div>
            <div class="auth-brand">CALLE HIRAYA CAFÉ</div>
            <h1 id="registerTitle">Create Account</h1>
            <p class="auth-subtitle">Join our coffee community.</p>

            <?php if (!empty($errors)): ?>
                <div class="alert alert-danger auth-alert" role="alert">
                    <?php foreach ($errors as $error): ?>
                        <div><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <form action="register.php" method="post" id="registerForm" novalidate>
                <div class="auth-field">
                    <label for="name" class="visually-hidden">Full Name</label>
                    <div class="input-glass">
                        <span class="input-icon" aria-hidden="true">👤</span>
                        <input type="text" id="name" name="name" placeholder="Full Name" autocomplete="name" value="<?= htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">
                    </div>
                </div>

                <div class="auth-field">
                    <label for="email" class="visually-hidden">Email Address</label>
                    <div class="input-glass">
                        <span class="input-icon" aria-hidden="true">✉</span>
                        <input type="email" id="email" name="email" placeholder="Email Address" autocomplete="email" value="<?= htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">
                    </div>
                </div>

                <div class="auth-field">
                    <label for="regPassword" class="visually-hidden">Password</label>
                    <div class="input-glass">
                        <span class="input-icon" aria-hidden="true">🔒</span>
                        <input type="password" id="regPassword" name="regPassword" placeholder="Password" autocomplete="new-password">
                    </div>
                </div>

                <div class="auth-field">
                    <label for="confirmPassword" class="visually-hidden">Confirm Password</label>
                    <div class="input-glass">
                        <span class="input-icon" aria-hidden="true">🔒</span>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" autocomplete="new-password">
                    </div>
                </div>

                <button type="submit" class="glass-submit">Register</button>
            </form>

            <div class="auth-divider"><span>or</span></div>

            <p class="register-prompt">
                Already have an account?
                <a href="login.php">Login</a>
            </p>
        </section>
    </main>
</body>
</html>
