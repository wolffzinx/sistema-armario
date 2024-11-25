const mongoose = require('mongoose');

const gavetaSchema = new mongoose.Schema({
  armario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Armario', required: true },
  numero: { type: String, required: true },
  status: { type: Boolean, default: false },
  aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' },
  valor: { type: Number },
  data_vencimento: { type: Date },
});

module.exports = mongoose.model('Gaveta', gavetaSchema);
