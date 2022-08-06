const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const userEsquema = require("../../schemas/user");
const mongoose = require("mongoose");
const { errorLogger } = require("../../helpers/logger");

class UserDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("user", userEsquema);
  }

  async saveAndGetUser(objeto) {
    try {
      return await this.collection.create(objeto);
    } catch (e) {
      errorLogger.error(e);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.collection.findOne({ email: email });
    } catch (err) {
      errorLogger.error(err);
    }
  }

  async updateAvatar(newAvatar, id) {
    try {
      const { modifiedCount } = await this.collection.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { avatar: newAvatar } }
      );
      return modifiedCount;
    } catch (e) {
      errorLogger.error(e);
    }
  }
}

module.exports = UserDaoMongoDb;
