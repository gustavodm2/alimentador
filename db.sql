CREATE TABLE horarios_alimentados(
             id SERIAL PRIMARY KEY,
             data_hora timestamp

);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
	usuario VARCHAR(999),
	senha VARCHAR(999)
);
