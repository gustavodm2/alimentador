function mostrarHorariosSelecionados(times) {
    times.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));

    const catalog = document.getElementById('fed-schedules');
    catalog.innerHTML = '';

    times.forEach(time => {
        const dataHora = new Date(time.data_hora);

        const dia = dataHora.toLocaleDateString('pt-BR', { weekday: 'long' });
        const horario = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const card = document.createElement('div');
        card.className = 'card'; 

        const cardDia = document.createElement('h3');
        cardDia.innerHTML = dia;

        const cardHorario = document.createElement('p');
        cardHorario.innerHTML = horario;

        card.appendChild(cardDia);
        card.appendChild(cardHorario);

        catalog.appendChild(card);
    });
}

fetch('times.php')
    .then(response => response.json())
    .then(times => {
        mostrarHorariosSelecionados(times);
    });
