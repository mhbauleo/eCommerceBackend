const Carrito = require("../carrito");
const controladorProductos = require("./controladorProductos")

const carrito = new Carrito("./persistencia/carrito.txt", controladorProductos);

module.exports = carrito