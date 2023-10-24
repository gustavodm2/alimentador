function mostrarHorariosSelecionados(times) {
    const catalog = document.querySelector('.card-container');
    
    const now = new Date(); 

    times.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));

    times.forEach(time => {
        const dataHora = new Date(time.data_hora);

        if (dataHora > now) { 
            const dia = dataHora.toLocaleDateString('pt-BR', { weekday: 'long' });
            const horario = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const card = document.createElement('div');
            card.className = 'card';

            const cardDia = document.createElement('h3');
            cardDia.innerHTML = dia;

            const cardHorario = document.createElement('p');
            cardHorario.innerHTML = horario;

            const cardData = document.createElement('p');
            cardData.innerHTML = dataHora.toLocaleString('pt-BR').split(" ")[0];

            card.appendChild(cardData);
            card.appendChild(cardDia);
            card.appendChild(cardHorario);

            catalog.appendChild(card);
        } else {
            alert('cu negro');
        }
    });
}

function removerHorariosPassados(times) {
    const now = new Date();

    for (let i = times.length - 1; i >= 0; i--) {
        const dataHora = new Date(times[i].data_hora);
        if (dataHora <= now) {
            times.splice(i, 1);
        }
    }
}

fetch('/schedules/times.php')
    .then(response => response.json())
    .then(times => {
        console.log(times);
        removerHorariosPassados(times);
        mostrarHorariosSelecionados(times);
    });

    
