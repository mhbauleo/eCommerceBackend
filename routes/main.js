const express = require('express')
const router = express.Router()

const routerProductos = require("./apiProductos");
const routerCarrito = require("./apiCarrito");
const routerOrdenes = require("./apiOrdenes")
const routerLogin = require("./login")

router.use("/api/productos", routerProductos);
router.use("/api/carrito", routerCarrito);
router.use("/api/ordenes", routerOrdenes)
router.use("/", routerLogin);

module.exports = router