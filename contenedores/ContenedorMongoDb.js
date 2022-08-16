const mongoose = require("mongoose");
const config = require("../config");
const { errorLogger } = require("../helpers/logger");

mongoose.connect(config.MONGO.BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class ContenedorMongoDb {
  constructor(model) {
    this.collection = model;
  }

  // Principales

  /* Devuelve id del nuevo elemento */
  async save(objeto) {
    try {
      const { _id } = await this.collection.create(objeto);
      return _id.toString();
    } catch (e) {
      errorLogger.error(e);
    }
  }

  /* Devuelve null en caso de no encontrar el objeto */
  async getById(idBuscado) {
    try {
      return await this.collection.findById(idBuscado);
    } catch (e) {
      errorLogger.error(e);
    }
  }

  async getAll() {
    try {
      return await this.collection.find({});
    } catch (e) {
      errorLogger.error(e);
    }
  }

  /* Devuelve la cantidad de elemento modificados */
  async updateById(newObject, id) {
    try {
      const { modifiedCount } = await this.collection.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        newObject
      );
      return modifiedCount;
    } catch (e) {
      errorLogger.error(e);
    }
  }

  /* Devuelve la cantidad de elemento borrados */ 
  async deleteById(id) {
    try {
      const { deletedCount } = await this.collection.deleteOne({
        _id: mongoose.Types.ObjectId(id),
      });
      return deletedCount;
    } catch (e) {
      errorLogger.error(e);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
    } catch (e) {
      errorLogger.error(e);
    }
  }
}

module.exports = ContenedorMongoDb;
