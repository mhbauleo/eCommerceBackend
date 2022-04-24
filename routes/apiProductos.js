const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const {productos} = require("../daos/index");
const admin = require("../persistencia/admin");

router.get("/", async (req, res) => {
  res.json(await productos.getAll());
});

router.get("/:id", async (req, res) => {
  const producto = await productos.getById(req.params.id);
  if (producto != null) {
    res.json(producto);
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", confirmarPermisos, async (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = await productos.save(nuevoProducto);

  res.json({ nuevoProducto, nuevoId });
});

router.put("/:id", confirmarPermisos, async (req, res) => {
  const nuevoProducto = req.body;

  if (await productos.updateById(nuevoProducto, req.params.id) > 0) {
    res.json({ mensaje: "Actualizado con éxito" });
  } else {
    res.json({ error: "No se pudo actualizar" });
  }
});

router.delete("/:id", confirmarPermisos, async (req, res) => {
  if (await productos.deleteById(req.params.id) > 0) {
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "No se pudo borrar" });
  }
});

// Middleware

function confirmarPermisos(req, res, next) {
  if (admin) {
    next();
  } else {
    res.json({
      error: -1,
      descripcion: `ruta /api/productos${req.path} método ${req.method} no autorizada`,
    });
  }
}

module.exports = router;
