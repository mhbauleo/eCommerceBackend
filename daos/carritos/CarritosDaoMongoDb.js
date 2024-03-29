const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const ProductosDaoMongoDb = require("../productos/ProductosDaoMongoDb");
const carritoModel = require("../../schemas/carrito");
const {deleteCarritoAux, getProductosAux, postProductoAux} = require('./CarritosCrudAux')

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(carritoModel);
    this.productos = new ProductosDaoMongoDb();
  }

  async crear() {
    return await this.save({ productos: [] });
  }

  /* Devuelve true si se borró correctamente */
  async deleteCarrito(id) {
    return await deleteCarritoAux(id, this)
  }

  /* Devuelve null en caso de no encontrar el carrito */
  async getProductos(id) {
    return await getProductosAux(id, this)
  }

  /* Devuelve true si pudo agregar el producto */
  async postProducto(idCarrito, idProducto) {
    return await postProductoAux(idCarrito, idProducto, this)
  }

  /* Devuelve true si pudo borrar el producto correctamente */
  async deleteProducto(idCarrito, idProducto) {
    const viejoCarrito = await this.getById(idCarrito);
    if (viejoCarrito != null) {
      const productos = viejoCarrito.productos;
      const index = productos.map((elem) => elem._id.toString()).indexOf(idProducto);

      if (index != -1) {
        productos.splice(index, 1);
        await this.updateById({ productos: productos }, idCarrito);
        return true;
      }
    }
    return false;
  }
}

module.exports = CarritosDaoMongoDb;
