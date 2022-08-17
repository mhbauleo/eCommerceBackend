const cartService = require('../services/cartService')

const createNewCart = async (req, res) => {
  const newId = await cartService.createNewCart()
  res
    .status(201)
    .json({
      status: "Success",
      message: "New Cart",
      id: newId,
    });
};

const deleteCart = async (req, res) => {
  const wasDeleted = await cartService.deleteCart(req.params.id)
  if (wasDeleted) {
    res.json({ status: "Success", message: "Cart deleted" });
  } else {
    res.status(404).json({ status: "Error", message: "We couldn't delete the cart" });
  }
};

const getProducts = async (req, res) => {
  const products = await cartService.getProducts(req.params.id)
  if (products != null) {
    res.json({ status: 'Success', message: 'Elements found', payload: products});
  } else {
    res.status(404).json({ status: "Error", message: "Cart not found" });
  }
};

const addProductToCart = async (req, res) => {
  const wasAdded = await cartService.addProductToCart(req.params.id, req.params.id_prod)
  if (wasAdded) {
    res.status(201).json({
        status: "Success",
        message: "Product added",
      });
  } else {
    res.status(404).json({ status: "Error", message: "We couldn't add the product" });
  }
};

const deleteProductCart = async (req, res) => {
  const wasDeleted = await cartService.deleteProductCart(req.params.id, req.params.id_prod)
  if (wasDeleted) {
    res.json({ status: 'Success', message: 'Successfully deleted'});
  } else {
    res.status(404).json({ status: 'Error', message: "We couldn't delete"});
  }
};

module.exports = {
  createNewCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProductCart
};
