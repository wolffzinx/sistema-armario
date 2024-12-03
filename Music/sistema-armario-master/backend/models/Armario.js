const mongoose = require('mongoose');

const armarioSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  localizacao: { type: String, required: true },
});

module.exports = mongoose.model('Armario', armarioSchema);
