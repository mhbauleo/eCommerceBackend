const express = require("express");
require('dotenv').config()
const { errorLogger, logger } = require('./helpers/logger')

const routerProductos = require("./routes/apiProductos");
const routerCarrito = require("./routes/apiCarrito");
const routerLogin = require("./routes/login")

const app = express();

app.use(express.static("./public"));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/", routerLogin);

app.all(`*`, (req, res) => {
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

const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const MODO = process.argv[2] || 'FORK'

const PORT = process.env.PORT || 8080;

const modoCluster = MODO == "CLUSTER";

if(modoCluster && cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  //logger.info(`Master ${process.pid} is running`)
  for(let i = 0; i < numCPUs; i++) {
      cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died ${new Date().toLocaleString()}`)
      //logger.info(`worker ${worker.process.pid} died ${new Date().toLocaleString()}`)
      cluster.fork();
  })
} else {
  const server = app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${server.address().port}`)
    console.log(`worker ${process.pid} is running`)
    //logger.info(`Servidor levantado en el puerto ${server.address().port}`)
    //logger.info(`worker ${process.pid} is running`)
  });
  
  server.on("error", (error) => errorLogger.error(`hubo un error ${error}`));
}