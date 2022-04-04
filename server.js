const express = require('express')

const routerProductos = require("./routes/apiProductos");
const routerCarrito = require("./routes/apiCarrito");

const app = express()

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

//--------------------------------------------------------------------------------

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${server.address().port}`)
})

server.on("error", (error) => console.log(`hubo un error ${error}`));