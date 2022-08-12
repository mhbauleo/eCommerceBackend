const express = require("express");
const router = express.Router();

const { getAllProducts, getProductsByCategory, getProductById, saveProduct, updateProduct, deleteProduct } = require('../controllers/productos')
const { auth, verifyAdminRole } = require('../middlewares/auth')
const { productJoiValidator } = require('../middlewares/validators')

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/categoria/:categoria", getProductsByCategory)
router.post("/", auth, verifyAdminRole, productJoiValidator, saveProduct);
router.put("/:id", auth, verifyAdminRole, productJoiValidator, updateProduct);
router.delete("/:id", auth, verifyAdminRole, deleteProduct);

module.exports = router;
