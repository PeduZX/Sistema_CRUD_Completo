CREATE DATABASE CrudImagem;
USE CrudImagem;
 
 
CREATE TABLE users(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL
);
 
CREATE TABLE carros(
id INT PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(255),
marca VARCHAR(255),
origem_fabricante VARCHAR(255),
tipo_carroceria VARCHAR(255),
nome_original VARCHAR(255),
nome_arquivo VARCHAR(255),
data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);


SELECT * FROM users;

SELECT * FROM carros;

DELETE FROM carros WHERE id = 1;


