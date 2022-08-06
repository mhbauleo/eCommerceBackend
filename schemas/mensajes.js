const mongoose = require("mongoose");

const mensajesEsquema = new mongoose.Schema(
  {
    email: {type: String, require: true},
    tipo: {type: String, require: true},
    text: {type: String, require: true},
    fecha: {type: String, require: true},
  },
  { timestamps: true }
);

module.exports = mensajesEsquema;
