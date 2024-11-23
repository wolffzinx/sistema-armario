const express = require('express');
const Aluno = require('../models/Aluno');
const router = express.Router();

// Rota para criar um novo aluno
router.post('/', async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).send(aluno);
});

// Rota para listar todos os alunos
router.get('/', async (req, res) => {
    console.log('Rota GET /alunos chamada'); // Log para verificar se a rota é acessada
    try {
      const alunos = await Aluno.find(); // Busca todos os alunos
      console.log('Alunos encontrados:', alunos); // Log dos alunos encontrados
      res.send(alunos); // Envia a lista de alunos como resposta
    } catch (error) {
      console.error('Erro ao buscar alunos:', error); // Log de erro
      res.status(500).send(error); // Em caso de erro, envia uma resposta de erro
    }
  });

  
// Rota para deletar um aluno
router.delete('/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Rota para obter o status de pagamento de um aluno específico
router.get('/:id/status-pagamento', async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  
  if (!aluno) {
    return res.status(404).send('Aluno não encontrado');
  }

  res.send({ nome: aluno.nome, status_pagamento: aluno.status_pagamento });
});

module.exports = router;