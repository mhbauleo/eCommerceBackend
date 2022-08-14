const { createToken } = require('../helpers/jws')

const mostrarVistaRegister = (req, res) => {
  res.render("layouts/register");
};

const mostrarVistaLogin = (req, res) => {
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
      idCarrito
    },
  })
};

const login = (req, res) => {
  const { _id, nombre, idCarrito, email, rol } = req.user
  const token = createToken({ _id, nombre, idCarrito, email, rol })

  console.log(req.user)
  res.json({
      status: "Success",
      message: "Successfully logged",
      payload: {
        token,
        idCarrito
      },
    });
};

module.exports = {
  mostrarVistaLogin,
  mostrarVistaRegister,
  register,
  login
};
