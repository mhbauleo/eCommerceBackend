const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const productosEsquema = require("../../schemas/productos");

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", productosEsquema);
  }

  async getProductsByCategory(categoria) {
    try {
      return await this.collection.find({ categoria });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ProductosDaoMongoDb;
