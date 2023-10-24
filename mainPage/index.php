<?php
session_start();
include '../connect.php';

if (isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../header&login.css">
    <title>Alimentador Automatico</title>
</head>
<body>
    <header>
        <i class="fas fa-home fa-2x" method="post"></i>
        <div class="page-title">
        <h1>ALIMENTADOR AUTOMÁTICO</h1>
        </div>
        <?php if (isset($_SESSION['user_id'])) : ?>
            <div id="user-info" class="user-info">
                <span id="usernameDisplay" class="username-display">Bem vindo, <?php echo $_SESSION['usuario']; ?></span>
            <form method="post" action="">
                <button type="submit" name="logout" method="post">Sair</button>
            </form>
            </div>
        <?php else : ?>
            <span class="login-button" id="loginButton" onclick="openLoginPopup()">Entrar</span>
        <?php endif; ?>
    </header>
    <div id="overlay" class="overlay" onclick="closeLoginPopup()"></div>
    <div id="loginPopup" class="popup">
        <span class="close-button" onclick="closeLoginPopup()">&#10006;</span>
        <h2 class="login-text">Login</h2>
        <form id="login-form" method="post">
            <label class="username-text" for="username">Usuário:</label>
            <input class="username-text-box" type="text" id="username" name="username">
            <br>
            <label class="password-text" for="password">Senha:</label>
            <input class="password-text-box" type="password" id="password" name="password">
            <br>
            <div class="submit-text-section">
            <button class="submit-text" type="submit" method="post">Entrar</button>
            </div>
        </form>
        <div id="message"></div>
    </div>

    <div class="container">
        <div class="feed-button-section">
        <button class="feed-button" method="post" onclick="alimentarAgora()">Alimentar Agora</button>

        </div>

        <div class="schedules-section">
            <h1 class="schedules-text">Horários:</h1>
            <i class="fa fa-plus fa-lg" method="post"></i>
        </div>
    </div>

    <div class="container2">
        <div class="graph-image">
            <img src="\assets\graph.jpg" alt="">
        </div>
        <div class="schedules-buttons">
            <div class="scrollable-content">

            </div>
        </div>
        
    </div>

    <div class="history-button-section">
        <a href="\schedules\index.php">
        <button class="history-button" method="post">Ver histórico</button>
        </a>
    </div>
</body>
<script src="\script.js"></script>
<script src="script-mainPage.js"></script>
</html>