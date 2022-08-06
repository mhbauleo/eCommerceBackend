const mongoose = require("mongoose");

const ordenesEsquema = new mongoose.Schema(
  {
    items: {type: String, require: true},
    nrOrden: {type: Number, require: true},
    estado: {type: String, require: true},
    email: {type: String, require: true}
  },
  { timestamps: true }
);

module.exports = ordenesEsquema;