const { productos } = require("../daos/index");

const getAllProducts = async (req, res) => {
  res.json({ status: 'Success', message: 'Elements found', payload: await productos.getAll()});
};

const getProductsByCategory = async (req, res) => {
  res.json({ status: 'Success', message: 'Elements found', payload: await productos.getProductsByCategory(req.params.categoria)});
}

const getProductById = async (req, res) => {
  const producto = await productos.getById(req.params.id);
  if (producto != null) {
    res.json({ status: 'Success', message: 'Element found', payload: producto});
  } else {
    res.status(404).json({ status: 'Error', message: `We couldn't get the element.`});
  }
};

const saveProduct = async (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = await productos.save(nuevoProducto);

  res.status(201).json({ status: 'Success', message: 'New element added', id: nuevoId });
};

const updateProduct = async (req, res) => {
  const nuevoProducto = req.body;

  if ((await productos.updateById(nuevoProducto, req.params.id)) > 0) {
    res.status(200).json({ status: 'Success', message: 'Successfully updated'});
  } else {
    res.status(404).json({ status: 'Error', message: "We couldn't update"});
  }
};

const deleteProduct = async (req, res) => {
  if ((await productos.deleteById(req.params.id)) > 0) {
    res.status(200).json({ status: 'Success', message: 'Successfully deleted'});
  } else {
    res.status(404).json({ status: 'Error', message: "We couldn't delete"});
  }
};

module.exports = { getAllProducts, getProductsByCategory, getProductById, saveProduct, updateProduct, deleteProduct }