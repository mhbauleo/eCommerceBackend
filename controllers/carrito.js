const { carrito } = require("../daos/index");

const createNewCart = async (req, res) => {
  res
    .status(201)
    .json({
      status: "Success",
      message: "New Cart",
      id: await carrito.crear(),
    });
};

const deleteCart = async (req, res) => {
  if (await carrito.deleteCarrito(req.params.id)) {
    res.json({ status: "Success", message: "Cart deleted" });
  } else {
    res.status(404).json({ status: "Error", message: "We couldn't delete the cart" });
  }
};

const getProducts = async (req, res) => {
  const productos = await carrito.getProductos(req.params.id);
  if (productos != null) {
    res.json({ status: 'Success', message: 'Elements found', payload: productos});
  } else {
    res.status(404).json({ status: "Error", message: "Cart not found" });
  }
};

const addProductToCart = async (req, res) => {
  if (await carrito.postProducto(req.params.id, req.params.id_prod)) {
    res.status(201).json({
        status: "Success",
        message: "Product added",
      });
  } else {
    res.status(404).json({ status: "Error", message: "We couldn't add the product" });
  }
};

const deleteProductCart = async (req, res) => {
  if (await carrito.deleteProducto(req.params.id, req.params.id_prod)) {
    res.json({ status: 'Success', message: 'Successfully deleted'});
  } else {
    res.status(404).json({ status: 'Error', message: "We couldn't delete"});
  }
};

const comprar = (req, res) => {
  res.redirect("/carrito");
};

module.exports = {
  createNewCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProductCart,
  comprar,
};
