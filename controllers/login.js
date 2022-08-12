const { User } = require("../daos/index");
const { createToken, verifyWebToken } = require('../helpers/jws')

const mostrarVistaRegister = (req, res) => {
  res.render("layouts/register");
};

const mostrarVistaLogin = (req, res) => {
  console.log(req.user)
  res.render("layouts/login");
};

const register = (req, res) => {

  console.log("user: "+ req.user)
  const { _id, nombre, idCarrito, email, rol } = req.user
  const token = createToken({ _id, nombre, idCarrito, email, rol })

  res.json({
    status: "Success",
    message: "Successfully registered",
    payload: {
      token,
    },
  })
};

const login = (req, res) => {
  const { _id, nombre, idCarrito, email, rol } = req.user
  const token = createToken({ _id, nombre, idCarrito, email, rol })

  console.log(req.user)
  res.cookie("idCarrito", req.user?.idCarrito).json({
      status: "Success",
      message: "Successfully logged",
      payload: {
        token,
      },
    });
};

module.exports = {
  mostrarVistaLogin,
  mostrarVistaRegister,
  register,
  login
};
