function mostrarHorariosSelecionados(times) {
    

    const now = new Date();

    times.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));

    times.forEach(time => {
        const dataHora = new Date(time.data_hora);
        const repetir = time.repetir;

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

            const cardRep = document.createElement('p');
            cardRep.innerHTML = repetir;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener('click', () => {
          
                excluirHorario(time.id); 
          
                card.remove();
            });
            if(!repetir){
            card.appendChild(cardData);
            card.appendChild(cardDia);
        }   
            card.appendChild(cardHorario);
            card.appendChild(deleteButton);
            

            let catalog;
            if(repetir){
                
                catalog = document.querySelector('.card-container');
                cardHorario.style.fontSize = '30px';

            } else {
                catalog = document.querySelector('.card-container2');
            }
            catalog.appendChild(card);
        } else {
            alert('cu negro');
        }
    });
}

function excluirHorario(id) {
    fetch('/schedules-info/delete_time.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Horário excluído com sucesso:', data);
        } else {
            console.error('Erro ao excluir horário:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao excluir horário:', error);
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

    
