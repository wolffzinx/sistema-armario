const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  matricula: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String },
  status_pagamento: { type: Boolean, default: false },
});

module.exports = mongoose.model('Aluno', alunoSchema);
