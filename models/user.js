const mongoose = require("mongoose")

const userEsquema = new mongoose.Schema(
    {
        nombre: {type: String, require: true},
        email: {type: String, require: true},
        direccion: {type: String, require: true},
        edad: {type: Number, require: true},
        telefono: {type: String, require: true},
        password: {type: String, require: true},
        idCarrito: {type: String, require: true},
        avatar: {type: String, require: true}
    },
    { timestamps: true }
  );
  
  module.exports = userEsquema;
  