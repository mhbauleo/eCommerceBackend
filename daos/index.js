let productos
let carrito
let User
let persistencia = "mongo"

switch (persistencia) {
    case "fileSystem":
        const ProductosDaoArchivo = require("./productos/ProductosDaoArchivo");
        const CarritosDaoArchivo = require("./carritos/CarritosDaoArchivo")
        productos = new ProductosDaoArchivo()
        carrito = new CarritosDaoArchivo()
        break;
    case "mongo":
        const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb");
        const CarritosDaoMongoDb = require("./carritos/CarritosDaoMongoDb")
        const UserDaoMongoDb = require("./user/UserDaoMongoDb")
        productos = new ProductosDaoMongoDb()
        carrito = new CarritosDaoMongoDb()
        User = new UserDaoMongoDb()
        break;
    default:
}

module.exports = {productos, carrito, User, persistencia}