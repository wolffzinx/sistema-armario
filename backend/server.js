const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose'); // Certifique-se de importar o mongoose


mongoose.connect('mongodb+srv://sistema_armarios:armario123@sistemaarmarios.egllx.mongodb.net/seu_banco_de_dados', {
  serverSelectionTimeoutMS: 30000, // Timeout de 30 segundos
});

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
