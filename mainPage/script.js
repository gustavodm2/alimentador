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

