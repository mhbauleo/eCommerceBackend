const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const joiCartSchema = require("./joi/carritoJoiSchema");

const carritoEsquema = new mongoose.Schema(
  Joigoose.convert(joiCartSchema),
  { timestamps: true }
);

module.exports = mongoose.model('carrito', carritoEsquema);
