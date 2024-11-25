const Armario = require('../models/Armario');

exports.createArmario = async (req, res) => {
  try {
    const armario = new Armario(req.body);
    await armario.save();
    res.status(201).send(armario);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar armário', details: error.message });
  }
};

exports.getArmarios = async (req, res) => {
  try {
    const armarios = await Armario.find();
    res.send(armarios);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar armários', details: error.message });
  }
};

exports.deleteArmario = async (req, res) => {
  try {
    const armarioDeletado = await Armario.findByIdAndDelete(req.params.id);
    if (!armarioDeletado) {
      return res.status(404).send({ error: 'Armário não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Erro ao deletar armário', details: error.message });
  }
};
