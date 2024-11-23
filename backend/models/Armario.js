const mongoose = require('mongoose');

const armarioSchema = new mongoose.Schema({
  numero: String,
  localizacao: String,
});

module.exports = mongoose.model('Armario', armarioSchema);