const rutaNoImplementada = (req, res) => {
  res.json({
    status: "Error",
    message: `ruta ${req.originalUrl} método ${req.method} no implementada`,
  });
};

module.exports = { rutaNoImplementada };
