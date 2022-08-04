const { User } = require("../daos/index");

const mostrarVistaRegister = (req, res) => {
  res.render("layouts/register");
};

const mostrarVistaRegisterError = (req, res) => {
  res.render("layouts/register-error");
};

const mostrarVistaLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("layouts/form", { nombre: req.user?.nombre });
  } else {
    res.render("layouts/login");
  }
};

const mostrarVistaLoginError = (req, res) => {
  res.render("layouts/login-error");
};

const mostrarVistaLogout = (req, res) => {
  let nombre = req.user?.nombre;
  console.log(`antes: ${JSON.stringify(req.user)}`);
  req.logOut((err) => {
    console.log(`despues: ${req.user}`);
    res.render("layouts/logout", { nombre });
  });
};

const registrarNuevoUsuario = (req, res) => {
  req.logOut((err) => {
    res.redirect("/login");
  });
};

const iniciarSesion = (req, res) => {
  res
    .cookie("idCarrito", req.user?.idCarrito)
    .render("layouts/form", { nombre: req.user?.nombre });
};

const actualizarUsuario = async (req, res) => {
    req.logIn(await User.getById(req.user._id), (err) => {
      if (!err) {
        res.redirect("/user");
      }
    });
};

module.exports = {
  mostrarVistaLogin,
  mostrarVistaLoginError,
  mostrarVistaRegister,
  mostrarVistaRegisterError,
  mostrarVistaLogout,
  registrarNuevoUsuario,
  iniciarSesion,
  actualizarUsuario,
};
