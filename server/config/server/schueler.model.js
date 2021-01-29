const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaSchueler = new Schema({
    name: {
      type: String
    },
    nachname: {
      type: String
    },
    klasse: {
      type: String
    },
    noten: {
    tests: [],
    mundlich: [],
    klausuren: []
    }
  });

module.exports = mongoose.model('Schueler', schemaSchueler);
