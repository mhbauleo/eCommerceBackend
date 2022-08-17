const { carrito } = require("../daos/index");

const createNewCart = async () => {
  return await carrito.crear();
};

const deleteCart = async (id) => {
  return await carrito.deleteCarrito(id);
};

const getProducts = async (id) => {
  return await carrito.getProductos(id);
};

const addProductToCart = async (cartId, productId) => {
  return await carrito.postProducto(cartId, productId);
};

const deleteProductCart = async (cartId, productId) => {
  return await carrito.deleteProducto(cartId, productId);
};

module.exports = {
  createNewCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProductCart,
};
