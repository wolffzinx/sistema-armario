const express = require('express');
const Gaveta = require('../models/Gaveta');
const router = express.Router();

// Criar uma nova gaveta
router.post('/', async (req, res) => {
  try {
    const gaveta = new Gaveta(req.body);
    await gaveta.save();
    res.status(201).send(gaveta);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar gaveta', details: error.message });
  }
});

// Listar todas as gavetas
router.get('/', async (req, res) => {
  try {
    const gavetas = await Gaveta.find().populate('armario_id aluno_id'); // Busca todas as gavetas e popula os dados do armário e do aluno
    res.send(gavetas); // Envia a lista de gavetas como resposta
  } catch (error) {
    console.error('Erro ao buscar gavetas:', error);
    res.status(500).send(error); // Em caso de erro, envia uma resposta de erro
  }
});

// Deletar uma gaveta pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const gaveta = await Gaveta.findByIdAndDelete(req.params.id);
    if (!gaveta) {
      return res.status(404).send('Gaveta não encontrada');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Erro ao deletar gaveta', details: error.message });
  }
});

// Atribuir um aluno a uma gaveta
router.put('/:id/atribuir', async (req, res) => {
  const { aluno_id } = req.body;
  try {
    const gaveta = await Gaveta.findById(req.params.id);
    
    if (!gaveta) {
      return res.status(404).send('Gaveta não encontrada');
    }

    gaveta.aluno_id = aluno_id;
    gaveta.status = true; // Marca como ocupada
    await gaveta.save();
    res.send(gaveta);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao atribuir aluno à gaveta', details: error.message });
  }
});

module.exports = router;