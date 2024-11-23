const express = require('express');
const Armario = require('../models/Armario');
const router = express.Router();

// Criar um novo armário
router.post('/', async (req, res) => {
  const armario = new Armario(req.body);
  await armario.save();
  res.status(201).send(armario);
});

// Listar todos os armários
router.get('/', async (req, res) => {
  try {
    const armarios = await Armario.find(); // Busca todos os armários
    res.send(armarios); // Envia a lista de armários como resposta
  } catch (error) {
    console.error('Erro ao buscar armários:', error);
    res.status(500).send(error); // Em caso de erro, envia uma resposta de erro
  }
});

// Deletar um armário pelo ID
router.delete('/:id', async (req, res) => {
  await Armario.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;