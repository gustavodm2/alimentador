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
        timeInput.addEventListener("change", () => {
            const selectedTime = timeInput.value;
            newTextbox.replaceChild(document.createTextNode(selectedTime), timeInput);
            alimentarAgora(newTextbox); // Salvar o horário inserido no banco de dados
        });
    });

    timeInput.addEventListener("change", () => {
        const selectedTime = timeInput.value;
        newTextbox.replaceChild(document.createTextNode(timeInput.value), timeInput);
    
        inserirHorarioNoBanco(selectedTime);
    });
});

function alimentarAgora(newTextbox) {
    const timeInput = newTextbox.querySelector("input[type='time']");
    const selectedTime = timeInput.value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "inserir_horario.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const data = "horario=" + encodeURIComponent(selectedTime);
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Horário inserido com sucesso!");
            atualizarHorarioSchedules(selectedTime);
        }
    };
}


function inserirHorarioNoBanco(selectedTime) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert_times.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const data = "horario=" + encodeURIComponent(selectedTime);
    xhr.send(data);
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert("Horário inserido com sucesso!");
        } else {
            alert("Erro ao inserir horário no banco de dados.");
        }
    };
}

console.log("Hora selecionada: " + selectedTime);