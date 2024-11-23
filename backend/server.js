const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Mova esta linha para cima, se necessário
const alunosRoutes = require('./routes/alunos');
const armariosRoutes = require('./routes/armarios');
const gavetasRoutes = require('./routes/gavetas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para analisar JSON no corpo da requisição

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://sistema_armarios:armario123@sistemaarmarios.egllx.mongodb.net/seu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Rotas
app.use('/alunos', alunosRoutes);
app.use('/armarios', armariosRoutes);
app.use('/gavetas', gavetasRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});