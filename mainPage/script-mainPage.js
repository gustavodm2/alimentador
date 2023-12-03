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

    const repeatCheckbox = document.createElement("input");
    repeatCheckbox.type = "checkbox";
    repeatCheckbox.id = "repeat-checkbox";
    const repeatLabel = document.createElement("label");
    repeatLabel.innerHTML = "Repetir diariamente";

    newTextbox.appendChild(repeatLabel);
    newTextbox.appendChild(repeatCheckbox);

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
            newTextbox.replaceWith();
            console.log(selectedDateTime);

            const repeatCheckboxValue = repeatCheckbox.checked;

            inserirHorarioNoBanco(selectedDateTime, repeatCheckboxValue);

            const popup2 = document.createElement("div");
            popup2.innerText = "Horário programado";
            popup2.className = "popup2";

            document.body.appendChild(popup2);

            setTimeout(() => {
                document.body.removeChild(popup2);
            }, 2000);
        }
    });
});

function alimentarAgora() {
    fetch('mqtt.php')
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
        
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

function areHoursAndMinutesEqual(date1, date2) {
    return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}



function dataHoraArrayInsert(times) {
    const selectedTimes = [];
    
    times.forEach(time => {
        const dataHora = new Date(time.data_hora);
        
        if (dataHora <= now) {
            selectedTimes.push(time);
        }
    });
    return selectedTimes;
}

var dataHoraArray = [];

async function getTimes() {
    try {
        const response = await fetch('insert_array.php');
        const times = await response.json();
        const temp = dataHoraArrayInsert(times);
        return temp;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

getTimes().then(dataHoraArray => {
    console.log(dataHoraArray);

    setInterval(async function () {
        try {
            const response = await fetch('../schedules/times.php');
            const times = await response.json();

            // Get the current time
            const now = new Date();
            console.log(now)
            const nowPlusOneMinute = new Date(now.getTime() - 1 * 60000);
            console.log(nowPlusOneMinute)

            // Filter the array for dates greater than the current time
            const dataHoraArray3 = times
                .map(item => ({
                    data_hora: new Date(item.data_hora)
                }))
                .filter(item => item.data_hora > nowPlusOneMinute);

            console.log(dataHoraArray3);

            for (const { data_hora } of dataHoraArray3) {
                console.log('Current time and data_hora ', now.getHours(), now.getMinutes(), data_hora.getHours(), data_hora.getMinutes());
                if (areHoursAndMinutesEqual(now, data_hora)) {
                    console.log('Current time matches the scheduled time ', now, data_hora);
                    const mqttResponse = await fetch('mqtt.php');
                    const mqttData = await mqttResponse.text();
                    console.log(mqttData);
                    console.log("mqtt");
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, 60000);
});


async function sendMessage() {
    try {
        const response = await fetch('mqtt.php');
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function openWeightPopup() {
    document.getElementById("overlayWeight").style.display = "block";
    document.getElementById("weightPopup").style.display = "block";
    fetch('mqttIsSendUnits.php')
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}
function closeWeightPopup() {
    document.getElementById("overlayWeight").style.display = "none";
    document.getElementById("weightPopup").style.display = "none";
    fetch('mqttIsSendUnitsStop.php')
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}


function inserirHorarioNoBanco(selectedDateTime, repeatCheckboxValue) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert_times2.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };

    const data = "data=" + encodeURIComponent(selectedDateTime);
    const repeat = "repeat=" + (repeatCheckboxValue ? 1 : 0); 
    xhr.send(`${data}&${repeat}`);

}

function getMQTTMessage() {
    fetch('receiveMQTT.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const pesoTextValue = document.getElementById('peso-text-value');
            pesoTextValue.innerText = data || '0.00';
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}
setInterval(getMQTTMessage, 500);