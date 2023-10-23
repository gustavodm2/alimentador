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

function alimentarAgora() {
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