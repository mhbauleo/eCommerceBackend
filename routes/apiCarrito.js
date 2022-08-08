const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { createNewCart, deleteCart, getProducts, addProductToCart, deleteProductCart } = require('../controllers/carrito')

router.post("/", createNewCart)
router.delete("/:id", deleteCart);
router.get("/:id/productos", getProducts);
router.post("/:id/productos/:id_prod", addProductToCart);
router.delete("/:id/productos/:id_prod", deleteProductCart);

module.exports = router;
