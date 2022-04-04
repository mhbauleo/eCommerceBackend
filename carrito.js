const Contenedor = require("./contenedor");
const Productos = require("./productos");

class Carrito {
  constructor(archivo, productos) {
    this.contenedor = new Contenedor(archivo);
    this.productos = productos;
  }

  async crear() {
    return await this.contenedor.save({ productos: [] });
  }

  async deleteCarrito(id) {
    await this.contenedor.deleteById(id);
  }

  // Devuelve null en caso de no encontrar el carrito

  async getProductos(id) {
    const carrito = await this.contenedor.getById(id);
    if (carrito !== null) {
      return carrito.productos;
    } else {
      return null;
    }
  }

  async postProducto(idCarrito, idProducto) {
    const producto = await this.productos.getProductoById(idProducto);
    if (producto !== null) {
      const viejoCarrito = await this.contenedor.getById(idCarrito);
      if (viejoCarrito !== null) {
        await this.contenedor.updateById(
          { productos: [...viejoCarrito.productos, producto] },
          idCarrito
        );
        return true;
      }
    }
    return false;
  }

  async deleteProducto(idCarrito, idProducto) {
    const viejoCarrito = await this.contenedor.getById(idCarrito);
    if (viejoCarrito !== null) {
      const productosAntes = viejoCarrito.productos;
      const productosDespues = productosAntes.filter(
        (elem) => elem.id != idProducto
      );
      await this.contenedor.updateById(
        { productos: productosDespues },
        idCarrito
      );
      return true;
    }
    return false;
  }
}

module.exports = Carrito;
