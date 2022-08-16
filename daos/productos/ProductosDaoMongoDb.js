const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const productosModel = require("../../schemas/productos");
const { logger } = require("../../helpers/logger");

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(productosModel);
  }

  async getProductsByCategory(categoria) {
    try {
      return await this.collection.find({ categoria });
    } catch (e) {
      logger.info(e);
    }
  }
}

module.exports = ProductosDaoMongoDb;
