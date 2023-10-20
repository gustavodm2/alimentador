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
        <h1>Alimentador Automático</h1>
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
    <div class="fed-schedules">
        <h1 class="fed-schedules-text">Horários Alimentados</h1>
        <div class="week-day-row1">
            <h2 class="week-day-1">Example Day 1</h2>
            <h2 class="week-day-2">Example Day 2</h2>
            <h2 class="week-day-3">Example Day 3</h2>
        </div>
        <div class="day-time-row1">
            <h2 id="day-time-1" class="day-time-1">Example Hour 1</h2>
            <h2 class="day-time-2">Example Hour 2</h2>
            <h2 class="day-time-3">Example Hour 3</h2>
        </div>
        <div class="week-day-row2">
            <h2 class="week-day-4">Example Day 4</h2>
            <h2 class="week-day-5">Example Day 5</h2>
            <h2 class="week-day-6">Example Day 6</h2>
        </div>
        <div class="day-time-row2">
            <h2 class="day-time-4">Example Hour 4</h2>
            <h2 class="day-time-5">Example Hour 5</h2>
            <h2 class="day-time-6">Example Hour 6</h2>
        </div>
    </div>
    
    <script src="\script.js"></script>
</body>
</html>