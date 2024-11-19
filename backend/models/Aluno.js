const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: String,
  matricula: String,
  email: String,
  telefone: String,
  status_pagamento: Boolean,
});

module.exports = mongoose.model('Aluno', alunoSchema);