const mongoose = require('mongoose');
const Aluno = require('../models/Aluno');

exports.criarAluno = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).send({
        error: 'Erro na conexão com o MongoDB',
        details: 'A conexão com o banco de dados não está pronta.',
      });
    }

    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).send(aluno);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar aluno', details: error.message });
  }
};

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.send(alunos);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar alunos', details: error.message });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    const alunoDeletado = await Aluno.findByIdAndDelete(req.params.id);
    if (!alunoDeletado) {
      return res.status(404).send({ error: 'Aluno não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Erro ao deletar aluno', details: error.message });
  }
};

exports.getAlunoStatusPagamento = async (req, res) => {
  try {
    console.log('Buscando aluno com ID:', req.params.id); // Adicionando log
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }
    res.send({ nome: aluno.nome, status_pagamento: aluno.status_pagamento });
  } catch (error) {
    console.error(error); // Log do erro
    res.status(500).send({ error: 'Erro ao buscar status de pagamento', details: error.message });
  }
};




// Função para listar todos os alunos
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find(); // Busca todos os alunos no banco de dados
    res.json(alunos); // Retorna a lista de alunos
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar alunos', details: error.message });
  }
};
