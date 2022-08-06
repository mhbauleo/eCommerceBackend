let persistencia = "MONGO"

const ProductosFactoryDao = require("./productos/ProductosFactory");
const UserFactoryDao = require("./user/UserFactory");
const CarritosFactoryDao = require("./carritos/CarritosFactory");

const productos = ProductosFactoryDao.get(persistencia);
const carrito = CarritosFactoryDao.get(persistencia);
const User = UserFactoryDao.get(persistencia);

module.exports = { productos, carrito, User }