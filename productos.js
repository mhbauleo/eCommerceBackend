const Contenedor = require("./contenedor");

class Productos {
  constructor(archivo) {
    this.contenedor = new Contenedor(archivo);
  }

  async getProductos() {
    return await this.contenedor.getAll();
  }

  // Devuelve null en caso de no encontrar el producto
  async getProductoById(id) {
    return await this.contenedor.getById(id);
  }

  // Devuelve 0 si el producto es inválido
  async postProducto(producto) {
    if (this.esProductoValido(producto)) {
      const nuevoId = await this.contenedor.save(producto);
      return nuevoId;
    } else {
      return 0;
    }
  }

  // Devuelve true si la actualización se realizó correctamente
  async putProducto(producto, id) {
    if ((await this.esIdValido(id)) && this.esProductoValido(producto)) {
      await this.contenedor.updateById(producto, id);
      return true;
    } else {
      return false;
    }
  }

  // Devuelve true si se borró correctamente
  async deleteProducto(id) {
    if (await this.esIdValido(id)) {
      await this.contenedor.deleteById(id)
      return true;
    } else {
      return false;
    }
  }

  // Auxiliares

  async esIdValido(id) {
    const productos = await this.getProductos();
    const ids = productos.map(elem => elem.id)
    return !isNaN(id) && ids.includes(id);
  }

  esProductoValido(producto) {
    return (
      producto.hasOwnProperty("nombre") &&
      producto.hasOwnProperty("descripcion") &&
      producto.hasOwnProperty("codigo") &&
      producto.hasOwnProperty("foto") &&
      producto.hasOwnProperty("precio") &&
      producto.hasOwnProperty("stock")
    );
  }
}

module.exports = Productos;
