
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <title>Alimentador Automático</title>
</head>
<body>
    <header>
        <a href="/mainPage/index.php">
            <i class="fas fa-home fa-2x"></i>
        </a>
        <h1>ALIMENTADOR AUTOMÁTICO</h1>
        <button class="login-button" onclick="openLoginPopup()">Entrar</button>
    </header>
    <div id="overlay" class="overlay" onclick="closeLoginPopup()"></div>
    <div id="loginPopup" class="popup">
        <span class="close-button" onclick="closeLoginPopup()">&#10006;</span>
        <h2 class="login-text">Login</h2>
        <form id="login-form">
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
        <div id="message"></div>
    </div>
    <div class="card-container2">
    <div id="fed-schedules" class="card-container"></div>
    </div>
    </div>
    <script src="script.js"></script>
    <script src="\script.js"></script>
</body>
</html>
