const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const joiProductsSchema = require("./joi/productosJoiSchema");

const productosEsquema = new mongoose.Schema(
  Joigoose.convert(joiProductsSchema),
  { timestamps: true }
);

module.exports = mongoose.model("productos", productosEsquema);
