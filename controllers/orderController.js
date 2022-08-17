const orderService = require("../services/orderService")

const newOrder = async (req, res) => {
  const { email, estado } = req.body;
  const orden = await orderService.newOrder(email, estado) 

  res.status(201).json({
    status: "Success",
    message: "New order",
    payload: orden,
  });
};

module.exports = { newOrder };
