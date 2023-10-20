function mostrarHorariosSelecionados(times) {
    // Ordenar os horários mais novos primeiro
    times.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));

    const catalog = document.getElementById('fed-schedules');
    catalog.innerHTML = '';

    times.forEach(time => {
        // Converte a data para um objeto Date
        const dataHora = new Date(time.data_hora);

        // Extrai o dia e o horário
        const dia = dataHora.toLocaleDateString('pt-BR', { weekday: 'long' });
        const horario = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        // Cria um elemento HTML para o card
        const card = document.createElement('div');
        card.className = 'card'; 

        // Cria a parte superior do card para o dia
        const cardDia = document.createElement('h3');
        cardDia.innerHTML = dia;

        // Cria a parte inferior do card para o horário
        const cardHorario = document.createElement('p');
        cardHorario.innerHTML = horario;

        // Adiciona as partes ao card
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
