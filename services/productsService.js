const { productos } = require("../daos/index");

const getAllProducts = async () => {
    return await productos.getAll()
};
const getProductsByCategory = async (category) => {
    return await productos.getProductsByCategory(category)
};
const getProductById = async (id) => {
    return await productos.getById(id)
};
const saveProduct = async (newProduct) => {
    return await productos.save(newProduct)
};
const updateProduct = async (newProduct, id) => {
    return await productos.updateById(newProduct, id)
};
const deleteProduct = async (id) => {
    return await productos.deleteById(id)
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
