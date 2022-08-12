const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const userModel = require("../../schemas/user");
const { errorLogger } = require("../../helpers/logger");

class UserDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(userModel);
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
}

module.exports = UserDaoMongoDb;
