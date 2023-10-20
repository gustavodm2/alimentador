<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <title>Alimentador Automatico</title>
</head>
<body>
    <header>
        <i class="fas fa-home fa-2x"></i>
        <h1>ALIMENTADOR AUTOMÁTICO</h1>
        <button class="login-button" onclick="openLoginPopup()">Entrar</button>
    </header>
    <div id="overlay" class="overlay" onclick="closeLoginPopup()"></div>
    <div id="loginPopup" class="popup">
        <span class="close-button" onclick="closeLoginPopup()">&#10006;</span>
        <h2 class="login-text">Login</h2>
        <form>
            <label class="username-text" for="username">Usuário:</label>
            <input class="username-text-box" type="text" id="username" name="username">
            <br>
            <label class="password-text" for="password">Senha:</label>
            <input class="password-text-box" type="password" id="password" name="password">
            <br>
            <div class="submit-text-section">
            <input class="submit-text" type="submit" value="Entrar">
            </div>
        </form>
    </div>

    <div class="container">
        <div class="feed-button-section">
        <button class="feed-button" onclick="alimentarAgora()">Alimentar Agora</button>

        </div>

        <div class="schedules-section">
            <h1 class="schedules-text">Horários:</h1>
            <i class="fa fa-plus fa-lg"></i>
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
        <button class="history-button">Ver histórico</button>
        </a>
    </div>
</body>
<script src="\script.js"></script>
</html>