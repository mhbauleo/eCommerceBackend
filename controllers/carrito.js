const comprar = (req, res) => {
    res.redirect('/carrito')
}

const mostrarVistaCarrito = (req, res) => {
    if (req.isAuthenticated()) {
      res.cookie("idCarrito", req.user?.idCarrito).render("layouts/cart", {nombre: req.user?.nombre});
    } else {
      res.redirect("/login");
    }
  }

module.exports = { comprar, mostrarVistaCarrito}