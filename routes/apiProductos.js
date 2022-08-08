const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { getAllProducts, getProductsByCategory, getProductById, saveProduct, updateProduct, deleteProduct } = require('../controllers/productos')
const { confirmarPermisos } = require('../middlewares/admin')

router.get("/", getAllProducts);
router.get("/:categoria", getProductsByCategory)
router.get("/:id", getProductById);
router.post("/", confirmarPermisos, saveProduct);
router.put("/:id", confirmarPermisos, updateProduct);
router.delete("/:id", confirmarPermisos, deleteProduct);

module.exports = router;
