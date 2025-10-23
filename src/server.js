const express = require("express");
const cors = require("cors");
const connection = require("./db_config");

// Definir a porta e instanciar o express
const porta = 3000;

// Habilitar o cors e utilização de JSON
const app = express();
app.use(cors());
app.use(express.json());


// Rota GET para listar usuários
app.get("/listar", (request, response) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (results) {
      response.status(200).json({ success: true, message: "Sucesso!", data: results });
    } else {
      response.status(400).json({ success: false, message: "Sem sucesso!", data: err });
    }
  });
});

app.get('/imagens', (req, res) => {
  const sql = 'SELECT * FROM imagens ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagens:', err);
      
      return res.status(500).json({ erro: 'Erro ao buscar imagens' });
    }
    res.json(results);
  });
});


// Rota POST para cadastrar novo usuário
app.post('/register', (req, res) => {
  const { nomeInput, emailInput, senhaInput, arquivo } = req.body;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Erro ao criptografar senha' });

    const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, hash], (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    });
  });
});



// Rota PUT para editar usuário
app.put("/editar/:id", (request, response) => {
  const params = [
    request.params.id,
    request.body.nome,
    request.body.email,
    request.body.senha,
    request.body.imagem
  ];

  const query = `
    UPDATE users SET
    nome = ?,
    email = ?,
    senha = ?,
    imagem = ?,
    WHERE id = ?
  `;

  connection.query(query, params, (err, results) => {
    if (err) {
      return response.status(400).json({ success: false, message: "Erro ao atualizar", data: err });
    }
    response.status(200).json({ success: true, message: "Planta atualizada", data: results });
  });
});


// Rota DELETE para excluir usuário
app.delete("/deletar/:id", (request, response) => {
  let params = [request.params.id];
  let query = "DELETE FROM users WHERE id = ?;";
  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(200).json({ success: true, message: "Sucesso", data: results });
    } else {
      response.status(400).json({ success: false, message: "Sem Sucesso", data: err });
    }
  });
});


// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // CB = call back
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Middlewares
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cors());

// Rota POST para upload
app.post("/uploads", upload.single('arquivo'), (req, res) => {
  const { originalname, filename } = req.file;
  console.log("Arquivo salvo:", filename);

  const sql = 'INSERT INTO imagens (nome_original, nome_arquivo) VALUES (?, ?)';
  db.query(sql, [originalname, filename], (err) => {
    if (err) {
      console.error("Erro ao salvar no banco:", err);
      return res.status(500).json({ erro: 'Erro ao salvar no banco' });
    }
    res.json({ mensagem: 'Upload realizado com sucesso!' });
  });
});

// Rota GET para listar imagens
app.get('/imagens', (req, res) => {
  const sql = 'SELECT * FROM imagens ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagens:', err);
      return res.status(500).json({ erro: 'Erro ao buscar imagens' });
    }
    res.json(results);
  });
});




// Iniciar servidor
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000")
})