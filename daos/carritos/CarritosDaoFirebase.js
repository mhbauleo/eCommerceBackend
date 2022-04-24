const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");
const ProductosDaoFirebase = require("../productos/ProductosDaoFirebase");
const ObjCompare = require('../../functions/aux')
const {deleteCarritoAux, getProductosAux, postProductoAux} = require('../../functions/carritos')

class CarritosFirebase extends ContenedorFirebase {
  constructor() {
    super("carrito");
    this.productos = new ProductosDaoFirebase();
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
      for (let i = 0; i < productos.length; i++) {
        if (
          ObjCompare(productos[i], await this.productos.getById(idProducto))
        ) {
          productos.splice(i, 1);
          await this.updateById({ productos: productos }, idCarrito);
          return true;
        }
      }
    }
    return false;
  }
}

module.exports = CarritosFirebase;
