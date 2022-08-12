const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const joiMessagesSchema = require("./joi/mensajesJoiSchema");

const mensajesEsquema = new mongoose.Schema(
  Joigoose.convert(joiMessagesSchema),
  { timestamps: true }
);

module.exports = mongoose.model('mensajes', mensajesEsquema);
