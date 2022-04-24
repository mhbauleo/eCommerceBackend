const mongoose = require("mongoose");

const carritoEsquema = new mongoose.Schema(
  {
    productos: {
      type: [],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = carritoEsquema;
