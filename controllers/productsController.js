const productsService = require('../services/productsService')

const getAllProducts = async (req, res) => {
  const allProducts = await productsService.getAllProducts()
  res.json({
    status: "Success",
    message: "Elements found",
    payload: allProducts,
  });
};

const getProductsByCategory = async (req, res) => {
  const productsByCategory = await productsService.getProductsByCategory(req.params.categoria)
  res.json({
    status: "Success",
    message: "Elements found",
    payload: productsByCategory,
  });
};

const getProductById = async (req, res) => {
  const product = await productsService.getProductById(req.params.id);
  if (product != null) {
    res.json({
      status: "Success",
      message: "Element found",
      payload: product,
    });
  } else {
    res
      .status(404)
      .json({ status: "Error", message: `We couldn't get the element.` });
  }
};

const saveProduct = async (req, res) => {
  const newId = await productsService.saveProduct(req.body);
  res
    .status(201)
    .json({ status: "Success", message: "New element added", id: newId });
};

const updateProduct = async (req, res) => {
  const updateCount = await productsService.updateProduct(req.body, req.params.id)
  if (updateCount > 0) {
    res
      .status(200)
      .json({ status: "Success", message: "Successfully updated" });
  } else {
    res.status(404).json({ status: "Error", message: "We couldn't update" });
  }
};

const deleteProduct = async (req, res) => {
  const deleteCount = await productsService.deleteProduct(req.params.id)

  if (deleteCount > 0) {
    res
      .status(200)
      .json({ status: "Success", message: "Successfully deleted" });
  } else {
    res.status(404).json({ status: "Error", message: "We couldn't delete" });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
