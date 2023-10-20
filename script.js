const scrollableContent = document.querySelector(".scrollable-content");

document.querySelector(".fa-plus").addEventListener("click", () => {
    const newTextbox = document.createElement("div");
    newTextbox.className = "textbox";

    const clockIcon = document.createElement("i");
    clockIcon.className = "fas fa-clock";
    clockIcon.style.padding = "12px"; 

    const trashIcon = document.createElement("i");
    trashIcon.className = "fas fa-trash";
    trashIcon.style.padding = "12px"; 

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.style.display = "none"; 

    newTextbox.appendChild(clockIcon);
    newTextbox.appendChild(timeInput);
    newTextbox.appendChild(trashIcon);

    scrollableContent.appendChild(newTextbox);

    trashIcon.addEventListener("click", () => {
        scrollableContent.removeChild(newTextbox);
    });

    clockIcon.addEventListener("click", () => {
        timeInput.style.display = "block";
    });

    timeInput.addEventListener("change", () => {
        newTextbox.replaceChild(document.createTextNode(timeInput.value), timeInput);
    });
});

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

function alimentarAgora() {
    // Enviar uma solicitação AJAX para o servidor PHP
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "insert_times.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Horário alimentado com sucesso!");
            var horarioAtual = new Date().toLocaleTimeString();
            atualizarHorarioSchedules(horarioAtual);
            
        }
    };
    xhr.send();
}

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
            if (data === "Login bem-sucedido!") {
                loginButton.style.display = "none"; 
                document.getElementById("usernameDisplay").innerText = `Bem vindo, ${username}`; 
                document.getElementById("usernameDisplay").classList.remove("hidden"); 
            }
        });
    });
});


