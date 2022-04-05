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

  // Devuelve true si se borró correctamente
  async deleteCarrito(id) {
    if (await this.esIdValido(id)) {
      await this.contenedor.deleteById(id);
      return true;
    } else {
      return false;
    }
  }

  // Devuelve null en caso de no encontrar el carrito
  async getProductos(id) {
    const carrito = await this.contenedor.getById(id);
    if (carrito != null) {
      return carrito.productos;
    } else {
      return null;
    }
  }

  async postProducto(idCarrito, idProducto) {
    const producto = await this.productos.getProductoById(idProducto);
    if (producto != null) {
      const viejoCarrito = await this.contenedor.getById(idCarrito);
      if (viejoCarrito != null) {
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
    if (viejoCarrito != null) {
      const productos = viejoCarrito.productos;
      const index = productos.map(elem => elem.id).indexOf(idProducto)

      if(index != -1) {
        productos.splice(index, 1);
        await this.contenedor.updateById(
          { productos: productos },
          idCarrito
        );
        return true
      }
    }
    return false;
  }

  // Auxiliares

  async esIdValido(id) {
    const carritos = await this.contenedor.getAll();
    const ids = carritos.map((elem) => elem.id);
    return !isNaN(id) && ids.includes(id);
  }
}

module.exports = Carrito;
