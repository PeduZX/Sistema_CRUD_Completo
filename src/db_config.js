// Importar pacote do MySql
const mysql = require("mysql2");

// Criar conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "herbario",
});

// Testar conexão
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySql Conectado");
  }
});

module.exports = connection;