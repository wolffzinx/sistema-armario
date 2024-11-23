const mongoose = require('mongoose');

const gavetaSchema = new mongoose.Schema({
  armario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Armario' },
  numero: String,
  status: Boolean,
  aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' },
  valor: Number,
  data_vencimento: Date,
});

module.exports = mongoose.model('Gaveta', gavetaSchema);