const express = require("express");
const Socket = require('./services/socket')
const { errorLogger } = require('./helpers/logger')
const config = require('./config')

const routerMain = require('./routes/main')

const app = express();
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      description: "A simple CRUD API application made with Express and documented with Swagger"
    }
  },
  apis: [ './docs/**/*.yaml' ]
}

const swaggerSpecs = swaggerJsdoc(options)
const specs = swaggerJsdoc(options)

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerMain);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))


/*----------------------- Motor de plantillas -----------------------*/
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

/*-----------------------       Server       -----------------------*/

const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const MODO = config.MODO

const PORT = config.PORT

const modoCluster = MODO == "CLUSTER";

if(modoCluster && cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  for(let i = 0; i < numCPUs; i++) {
      cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died ${new Date().toLocaleString()}`)
      cluster.fork();
  })
} else {
  const server = app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT} (${config.NODE_ENV} - ${config.PERSISTENCIA})`)
    console.log(`worker ${process.pid} is running`)
  });
  new Socket(server)

  server.on("error", (error) => errorLogger.error(`hubo un error ${error}`));
}