const scrollableContent = document.querySelector(".scrollable-content");
const now = new Date();
document.querySelector(".fa-plus").addEventListener("click", () => {
    const newTextbox = document.createElement("div");
    newTextbox.className = "textbox";

    const clockIcon = document.createElement("i");
    clockIcon.className = "fas fa-clock";
    clockIcon.style.padding = "12px";

    const trashIcon = document.createElement("i");
    trashIcon.className = "fas fa-trash";
    trashIcon.style.padding = "12px";

    const dateInput = document.createElement("input");
    dateInput.type = "date";

    const timeInput = document.createElement("input");
    timeInput.type = "time";

    newTextbox.appendChild(clockIcon);
    newTextbox.appendChild(dateInput);
    newTextbox.appendChild(timeInput);
    newTextbox.appendChild(trashIcon);

    // Crie um botão para definir a repetição diária
    const repeatButton = document.createElement("button");
    repeatButton.innerText = "Repetir Diariamente";
    newTextbox.appendChild(repeatButton);

    // Adicione um atributo de dados para armazenar a escolha do usuário
    newTextbox.dataset.repeat = "false";

    scrollableContent.appendChild(newTextbox);

    trashIcon.addEventListener("click", () => {
        scrollableContent.removeChild(newTextbox);
    });

    clockIcon.addEventListener("click", () => {
        dateInput.style.display = "block";
        timeInput.style.display = "block";
    });

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.classList.add("submit-button");
    newTextbox.appendChild(submitButton);

    submitButton.addEventListener("click", () => {
        const selectedDate = new Date(`${dateInput.value} ${timeInput.value}`);

        if (selectedDate <= now) {
            alert("Horário deve ser maior que o atual.");
        } else if (dateInput.value && timeInput.value) {
            const selectedDateTime = `${dateInput.value} ${timeInput.value}`;
            newTextbox.replaceWith(selectedDateTime);
            console.log(selectedDateTime);

            // Armazene a escolha do usuário para a repetição diária
            const repeatDaily = newTextbox.dataset.repeat === "true" ? "Sim" : "Não";
            inserirHorarioNoBanco(selectedDateTime, repeatDaily);

            const popup2 = document.createElement("div");
            popup2.innerText = "Horário programado";
            popup2.className = "popup2";
            
            document.body.appendChild(popup2);
            
            setTimeout(() => {
                document.body.removeChild(popup2);
            }, 2000);
        }
    });

    repeatButton.addEventListener("click", () => {
        // Alterne a escolha do usuário (true/false) e atualize o atributo de dados
        const currentRepeatValue = newTextbox.dataset.repeat;
        newTextbox.dataset.repeat = currentRepeatValue === "true" ? "false" : "true";

        // Atualize o texto do botão com base na escolha do usuário
        repeatButton.innerText = newTextbox.dataset.repeat === "true" ? "Repetir Diariamente" : "Não Repetir Diariamente";
    });
});

function alimentarAgora() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "insert_times.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Horário alimentado com sucesso!");
            var horarioAtual = new Date().toLocaleTimeString();
            atualizarHorarioSchedules(horarioAtual);
        }
    };
    xhr.send();
}

function inserirHorarioNoBanco(selectedDateTime, repeatDaily) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert_times2.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };

    const data = "data=" + encodeURIComponent(selectedDateTime) + "&repeatDaily=" + encodeURIComponent(repeatDaily);
    xhr.send(data);
}
