const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaUmfrage = new Schema({
    name: String,
    fragen: Array,
    optionen: Array,
    ergebnisse: Array
  });

module.exports = mongoose.model('Umfrage', schemaUmfrage);
