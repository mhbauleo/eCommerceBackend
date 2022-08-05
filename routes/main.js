const express = require('express')
const router = express.Router()

const routerProductos = require("./apiProductos");
const routerCarrito = require("./apiCarrito");
const routerLogin = require("./login")

router.use("/api/productos", routerProductos);
router.use("/api/carrito", routerCarrito);
router.use("/", routerLogin);

module.exports = router