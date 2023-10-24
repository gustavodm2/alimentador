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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../header&login.css">
    <title>Alimentador Automático</title>
</head>
<body>
<header>
        <i class="fas fa-bars fa-2x" id="menu-icon"></i>
        <div class="page-title">
        <h1>BEST FEEDER</h1>
        </div>
        <?php if (isset($_SESSION['user_id'])) : ?>
            <div id="user-info" class="user-info">
                <span id="usernameDisplay" class="username-display">Bem vindo, <?php echo $_SESSION['usuario']; ?></span>
            <form method="post" action="">
                <button type="submit" name="logout">Sair</button>
            </form>
            </div>
        <?php else : ?>
            <span class="login-button" id="loginButton" onclick="openLoginPopup()">Entrar</span>
        <?php endif; ?>

    </header>
    <div id="sidebar" class="sidebar">
    <ul>
        <li><a class="sidebar-link" href="\mainPage\index.php">Página Inicial</a></li>
        <li><a class="sidebar-link" href="\schedules\index.php">Histórico</a></li>
        <li><a class="sidebar-link" href="\schedules-info\index.php">Informações horário</a></li>
        <li><a class="sidebar-link" id="quem-somos" href="\about-us\index.php">Quem somos</a></li>
    </ul>
    </div>
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
            <button class="submit-text" type="submit">Entrar</button>
            </div>
        </form>
        </div>
        <div class="box">
            <div class="contact-us">
                <p><h1>Quem Somos - Best Feeder</h1>
    
    <p>A <strong>Best Feeder</strong> é apaixonada por facilitar a vida dos donos de animais de estimação. Nossa missão é simplificar a alimentação de animais de estimação, proporcionando confiabilidade e inovação.</p>

    <h2>Inovação e Qualidade</h2>
    <p>Nossa equipe se dedica a criar produtos de alta qualidade e durabilidade. Priorizamos a inovação, utilizando tecnologias de ponta para tornar a vida dos tutores mais fácil.</p>

    <h2>Atendimento ao Cliente de Excelência</h2>
    <p>Estamos aqui para você. Oferecemos um suporte excepcional, garantindo que você e seu animal de estimação tenham a melhor experiência possível.</p>

    <p>Na <strong>Best Feeder</strong>, unimos tecnologia e paixão por animais para melhorar a vida de tutores de pets. Junte-se a nós e experimente a conveniência dos nossos alimentadores automáticos.</p></p>
                <p>Agradecemos pelo interesse e pelo apoio. Estamos ansiosos para ouvir de você!</p>
            </div>
        <div id="message"></div>
    </div>
    
    <script src="\script.js"></script>
</body>
</html>