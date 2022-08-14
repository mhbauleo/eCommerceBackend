const config = require('../config')

const ProductosFactoryDao = require("./productos/ProductosFactory");
const UserFactoryDao = require("./user/UserFactory");
const CarritosFactoryDao = require("./carritos/CarritosFactory");
const OrdenesFactoryDao = require("./ordenes/OrdenesFactory")
const MensajesFactoryDao = require("./mensajes/MensajesFactory")

const productos = ProductosFactoryDao.get(config.PERSISTENCIA);
const carrito = CarritosFactoryDao.get(config.PERSISTENCIA);
const User = UserFactoryDao.get(config.PERSISTENCIA);
const ordenes = OrdenesFactoryDao.get(config.PERSISTENCIA)
const mensajes = MensajesFactoryDao.get(config.PERSISTENCIA)

module.exports = { productos, carrito, User, ordenes , mensajes }