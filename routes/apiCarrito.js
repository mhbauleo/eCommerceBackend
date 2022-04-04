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
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "Carrito no encontrado" });
  }
});

router.get("/:id/productos", async (req, res) => {
  res.json(await carrito.getProductos(Number(req.params.id)));
});

router.post("/:id/productos", async (req, res) => {
  console.log(typeof req.body)
  console.log(req.body)

  if (await carrito.postProducto(Number(req.params.id), Number(req.body.id_prod))) {
    res.json({ ok : "ok"});
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  if (await carrito.deleteProducto(Number(req.params.id), Number(req.params.id_prod))) {
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

module.exports = router;
