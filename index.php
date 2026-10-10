<?php
session_start();

if (empty($_SESSION['auth']) || $_SESSION['auth'] !== true) {
    header('Location: login.php');
    exit;
}

$siteTitle = 'Calle Hiraya Café | Home';
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/navigation.php';
require __DIR__ . '/includes/hero.php';
require __DIR__ . '/includes/menu.php';
require __DIR__ . '/includes/about.php';
require __DIR__ . '/includes/contact.php';
require __DIR__ . '/includes/footer.php';
