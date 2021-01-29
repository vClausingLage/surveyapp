const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaKlasse = new Schema({
  stufe: {
    type: Number
  },
  klasse: {
    type: String
  },
  schueler: {
    type: Schema.Types.ObjectId,
    ref: "Schueler"
  }
});

module.exports = mongoose.model('Klasse', schemaKlasse);
