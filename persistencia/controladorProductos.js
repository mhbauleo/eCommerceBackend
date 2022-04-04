const Productos = require("../productos");

const controladorProductos = new Productos("./persistencia/productos.txt");

module.exports = controladorProductos