const express = require('express')
const router = express.Router()

const routerProductos = require("./productsRouter");
const routerCarrito = require("./cartRouter");
const routerOrdenes = require("./orderRouter")
const routerLogin = require("./loginRouter")
const routerInfo = require("./infoRouter")
const routerChat = require("./chatRouter")
const routerNoImplementada = require("./notImplementedRouter")

router.use("/api/productos", routerProductos);
router.use("/api/carrito", routerCarrito);
router.use("/api/ordenes", routerOrdenes)
router.use("/info", routerInfo)
router.use("/chat", routerChat)
router.use("/", routerLogin);
router.use('*', routerNoImplementada);

module.exports = router