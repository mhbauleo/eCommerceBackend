const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const ordenesEsquema = new mongoose.Schema(
  {
    items: {
      type: [],
      default: [],
    },
    estado: { type: String, require: true },
    email: { type: String, require: true },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
ordenesEsquema.plugin(autoIncrement.plugin, "ordenes");
module.exports = mongoose.model("ordenes", ordenesEsquema);
