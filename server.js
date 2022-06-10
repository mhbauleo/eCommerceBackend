const express = require("express");

const routerProductos = require("./routes/apiProductos");
const routerCarrito = require("./routes/apiCarrito");
const routerLogin = require("./routes/login")

const app = express();

app.use(express.static("./public"));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/", routerLogin);

app.get(`*`, (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta ${req.path} método ${req.method} no implementada`,
  });
});

app.post(`*`, (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta ${req.path} método ${req.method} no implementada`,
  });
});

app.put(`*`, (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta ${req.path} método ${req.method} no implementada`,
  });
});

app.delete(`*`, (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta ${req.path} método ${req.method} no implementada`,
  });
});

/*----------------------- Motor de plantillas ----------*/
const hbs = require("express-handlebars");

app.set("views", "./views");
app.engine(
  ".hbs",
  hbs.engine({
    defaultLayout: "index",
    layoutsDir: "./views/layouts",
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

//--------------------------------------------------------------------------------

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`hubo un error ${error}`));
