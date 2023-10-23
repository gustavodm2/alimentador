CREATE TABLE horarios_alimentados(
             id SERIAL PRIMARY KEY,
             data_hora timestamp

);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
	usuario VARCHAR(50),
	senha VARCHAR(40)
);
