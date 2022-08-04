const mostrarVistaHome = (req, res) => {
  if (req.isAuthenticated()) {
    res
      .render("layouts/form", { nombre: req.user?.nombre });
  } else {
    res.redirect("/login");
  }
};

const mostrarVistaCarrito = (req, res) => {
  if (req.isAuthenticated()) {
    res
      .cookie("idCarrito", req.user?.idCarrito)
      .render("layouts/cart", { nombre: req.user?.nombre });
  } else {
    res.redirect("/login");
  }
};

const mostrarVistaProductos = (req, res) => {
  if (req.isAuthenticated()) {
    res
      .cookie("idCarrito", req.user?.idCarrito)
      .render("layouts/productos", { nombre: req.user?.nombre });
  } else {
    res.redirect("/login");
  }
};

const mostrarVistaUser = (req, res) => {
  if (req.isAuthenticated()) {
    const { nombre, email, edad, direccion, telefono, avatar } = req.user;
    res.render("layouts/user", {
      nombre,
      email,
      edad,
      direccion,
      telefono,
      avatar,
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  mostrarVistaHome,
  mostrarVistaCarrito,
  mostrarVistaProductos,
  mostrarVistaUser,
};
