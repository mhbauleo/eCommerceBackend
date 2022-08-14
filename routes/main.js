const express = require('express')
const router = express.Router()

const routerProductos = require("./apiProductos");
const routerCarrito = require("./apiCarrito");
const routerOrdenes = require("./apiOrdenes")
const routerLogin = require("./login")
const routerInfo = require("./info")
const routerChat = require("./chat")
const routerNoImplementada = require("./ruta-no-implementada")

router.use("/api/productos", routerProductos);
router.use("/api/carrito", routerCarrito);
router.use("/api/ordenes", routerOrdenes)
router.use("/info", routerInfo)
router.use("/chat", routerChat)
router.use("/", routerLogin);
router.use('*', routerNoImplementada);

module.exports = router