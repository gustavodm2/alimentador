function openLoginPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("loginPopup").style.display = "block";
}

function closeLoginPopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("loginPopup").style.display = "none";
}

document.getElementById("loginPopup").addEventListener("click", function (event) {
    event.stopPropagation();
})


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const message = document.getElementById('message');
    const headerContent = document.getElementById('headerContent');
    const loginButton = document.getElementById('loginButton');

    loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/verify.php', {
        method: 'POST',
        body: new URLSearchParams({ username, password }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        message.innerText = data;
    });
});

});

// Adicione um evento de clique ao ícone de sanduíche para abrir o menu lateral
document.getElementById("menu-icon").addEventListener("click", openSidebar);

// Função para abrir o menu lateral
function openSidebar() {
    document.getElementById("sidebar").style.width = "250px"; // Largura do menu
}

// Função para fechar o menu lateral
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

// Feche o menu lateral quando clicar em qualquer lugar fora dele
window.addEventListener("click", function (event) {
    if (event.target.id === "sidebar") {
        closeSidebar();
    }
});
