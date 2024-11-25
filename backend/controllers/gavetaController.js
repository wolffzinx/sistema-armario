const Gaveta = require('../models/Gaveta');

exports.createGaveta = async (req, res) => {
  try {
    const gaveta = new Gaveta(req.body);
    await gaveta.save();
    res.status(201).send(gaveta);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar gaveta', details: error.message });
  }
};

exports.getGavetas = async (req, res) => {
  try {
    const gavetas = await Gaveta.find().populate('armario_id aluno_id');
    res.send(gavetas);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar gavetas', details: error.message });
  }
};

exports.deleteGaveta = async (req, res) => {
  try {
    const gavetaDeletada = await Gaveta.findByIdAndDelete(req.params.id);
    if (!gavetaDeletada) {
      return res.status(404).send({ error: 'Gaveta não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Erro ao deletar gaveta', details: error.message });
  }
};

exports.atribuirAluno = async (req, res) => {
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
};
