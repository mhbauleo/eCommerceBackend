const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");
const ProductosDaoArchivo = require("../productos/ProductosDaoArchivo");
const config = require("../../config");
const {deleteCarritoAux, getProductosAux, postProductoAux} = require('./CarritosCrudAux')

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super(`${config.fileSystem.baseUrl}carrito.txt`);
    this.productos = new ProductosDaoArchivo();
  }

  async crear() {
    return await this.save({ productos: [] });
  }

  // Devuelve true si se borró correctamente
  async deleteCarrito(id) {
    return await deleteCarritoAux(id, this)
  }

  // Devuelve null en caso de no encontrar el carrito
  async getProductos(id) {
    return await getProductosAux(id, this)
  }

  async postProducto(idCarrito, idProducto) {
    return await postProductoAux(idCarrito, idProducto, this)
  }

  async deleteProducto(idCarrito, idProducto) {
    const viejoCarrito = await this.getById(idCarrito);
    if (viejoCarrito != null) {
      const productos = viejoCarrito.productos;
      const index = productos.map(elem => elem.id).indexOf(Number(idProducto))

      if(index != -1) {
        productos.splice(index, 1);
        await this.updateById(
          { productos: productos },
          idCarrito
        );
        return true
      }
    }
    return false;
  }
}

module.exports = CarritosDaoArchivo;
