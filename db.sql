CREATE TABLE horarios_alimentados(
            id SERIAL PRIMARY KEY,
            data_hora timestamp
);

CREATE TABLE usuario(
            id SERIAL PRIMARY KEY,
	        usuario VARCHAR(50),
	        senha VARCHAR(999)
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuario (usuario, senha)
VALUES ('user aqui', ENCODE(DIGEST('senha aqui', 'sha256'), 'hex'));
