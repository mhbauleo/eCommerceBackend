const { createToken } = require('../helpers/jws')

const mostrarInicio = (req, res) => {
  res.redirect('/login')
}

const mostrarVistaRegister = (req, res) => {
  res.render("layouts/register");
};

const mostrarVistaLogin = (req, res) => {
  res.render("layouts/login");
};

const register = (req, res) => {
  const { _id, nombre, idCarrito, email, rol } = req.user
  const token = createToken({ _id, nombre, idCarrito, email, rol })

  res.status(201).json({
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
  mostrarInicio,
  mostrarVistaLogin,
  mostrarVistaRegister,
  register,
  login
};
