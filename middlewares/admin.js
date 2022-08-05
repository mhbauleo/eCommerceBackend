const admin = require("../persistencia/admin");

function confirmarPermisos(req, res, next) {
  if (admin) {
    next();
  } else {
    res.json({
      error: -1,
      descripcion: `ruta /api/productos${req.path} método ${req.method} no autorizada`,
    });
  }
}

module.exports = { confirmarPermisos }