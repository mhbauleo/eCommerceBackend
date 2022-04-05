const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const carrito = require("../persistencia/controladorCarrito");

router.post("/", async (req, res) => {
  res.json({id : await carrito.crear()}); 
})

router.delete("/:id", async (req, res) => {
  if (await carrito.deleteCarrito(Number(req.params.id))) {
    res.json({ mensaje: "Carrito borrado con éxito" });
  } else {
    res.json({ error: "No se pudo borrar" });
  }
});

router.get("/:id/productos", async (req, res) => {
  const productos = await carrito.getProductos(Number(req.params.id));
  if (productos != null) {
    res.json(productos);
  } else {
    res.json({ error: "Carrito no encontrado" });
  }
});

router.post("/:id/productos/:id_prod", async (req, res) => {
  if (await carrito.postProducto(Number(req.params.id), Number(req.params.id_prod))) {
    res.json({ mensaje : "Producto agregado con éxito"});
  } else {
    res.json({ error: "No se pudo agregar el producto" });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  if (await carrito.deleteProducto(Number(req.params.id), Number(req.params.id_prod))) {
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "No se pudo borrar" });
  }
});

module.exports = router;
