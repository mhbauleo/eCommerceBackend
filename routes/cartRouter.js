const express = require("express");
const router = express.Router();

const { createNewCart, deleteCart, getProducts, addProductToCart, deleteProductCart } = require('../controllers/cartController')
const { auth, verifyAdminRole } = require('../middlewares/auth')
const { verifyCart } = require('../middlewares/cart')

router.post("/", createNewCart)
router.delete("/:id", auth, verifyAdminRole, deleteCart);
router.get("/:id/productos", auth, verifyCart, getProducts);
router.post("/:id/productos/:id_prod", auth, verifyCart, addProductToCart);
router.delete("/:id/productos/:id_prod", auth, verifyCart, deleteProductCart);

module.exports = router;
