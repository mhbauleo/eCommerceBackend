const { productos } = require("../daos/index");

const getAllProducts = async (req, res) => {
  res.json(await productos.getAll());
};

const getProductById = async (req, res) => {
  const producto = await productos.getById(req.params.id);
  if (producto != null) {
    res.json(producto);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

const saveProduct = async (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = await productos.save(nuevoProducto);

  res.status(201).json({ nuevoProducto, nuevoId });
};

const updateProduct = async (req, res) => {
  const nuevoProducto = req.body;

  if ((await productos.updateById(nuevoProducto, req.params.id)) > 0) {
    res.status(204).json();
  } else {
    res.status(404).json({ error: "No se pudo actualizar" });
  }
};

const deleteProduct = async (req, res) => {
  if ((await productos.deleteById(req.params.id)) > 0) {
    res.status(204).json();
  } else {
    res.status(404).json({ error: "No se pudo borrar" });
  }
};

module.exports = { getAllProducts, getProductById, saveProduct, updateProduct, deleteProduct }