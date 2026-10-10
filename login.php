<?php
session_start();

if (!empty($_SESSION['auth']) && $_SESSION['auth'] === true) {
    header('Location: index.php');
    exit;
}

$errors = [];
$successMessage = '';

if (!empty($_SESSION['register_success'])) {
    $successMessage = $_SESSION['register_success'];
    unset($_SESSION['register_success']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || !preg_match('/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/', $email)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if ($password === '' || !preg_match('/^(?=.*[A-Za-z])(?=.*\d).{8,}$/', $password)) {
        $errors[] = 'Password must be at least 8 characters and include both letters and numbers.';
    }

    if (empty($errors)) {
        $usersFile = __DIR__ . '/data/users.json';
        $users = file_exists($usersFile) ? json_decode((string) file_get_contents($usersFile), true) : [];
        $users = is_array($users) ? $users : [];

        foreach ($users as $user) {
            if (isset($user['email']) && strtolower(trim($user['email'])) === strtolower($email) && password_verify($password, (string) $user['password_hash'])) {
                $_SESSION['auth'] = true;
                $_SESSION['user_name'] = $user['name'];
                header('Location: index.php');
                exit;
            }
        }

        $errors[] = 'The email or password you entered is incorrect.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calle Hiraya Café Login">
    <title>Calle Hiraya Café | Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="auth-page login-bg">
    <main class="auth-wrapper">
        <section class="glass-auth-card" aria-labelledby="loginTitle">
            <div class="auth-logo" aria-hidden="true">☕</div>
            <div class="auth-brand">CALLE HIRAYA CAFÉ</div>
            <h1 id="loginTitle">Welcome Back</h1>
            <p class="auth-subtitle">Your perfect coffee moment is waiting.</p>

            <?php if (!empty($successMessage)): ?>
                <div class="alert alert-success auth-alert" role="alert"><?= htmlspecialchars($successMessage, ENT_QUOTES, 'UTF-8'); ?></div>
            <?php endif; ?>

            <?php if (!empty($errors)): ?>
                <div class="alert alert-danger auth-alert" role="alert">
                    <?php foreach ($errors as $error): ?>
                        <div><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <form action="login.php" method="post" id="loginForm" autocomplete="off" novalidate>
                <div class="auth-field">
                    <label for="username" class="visually-hidden">Email Address</label>
                    <div class="input-glass">
                        <span class="input-icon" aria-hidden="true">👤</span>
                        <input type="text" id="username" name="username" placeholder="Email Address" autocomplete="off" value="<?= htmlspecialchars($_POST['username'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">
                    </div>
                </div>

                <div class="auth-field">
                    <label for="password" class="visually-hidden">Password</label>
                    <div class="input-glass">
                        <span class="input-icon" aria-hidden="true">🔒</span>
                        <input type="password" id="password" name="password" placeholder="Password" autocomplete="new-password">
                    </div>
                </div>

                <button type="submit" class="glass-submit">Login</button>
            </form>

            <div class="auth-divider"><span>or</span></div>

            <p class="register-prompt">
                Don't have an account?
                <a href="register.php">Register</a>
            </p>
        </section>
    </main>
</body>
</html>
