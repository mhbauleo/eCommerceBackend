const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const productosModel = require("../../schemas/productos");

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(productosModel);
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
