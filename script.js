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


