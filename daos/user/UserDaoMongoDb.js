const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb')
const userEsquema = require('../../models/user')
const {errorLogger} = require('../../helpers/logger')

class UserDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('user', userEsquema)
    }

    async saveAndGetUser(objeto) {
        try {
            return await this.collection.create(objeto);;
          } catch (e) {
            errorLogger.error(e);
          }
    }

    async getUserByEmail(email) {
        try {
            return await this.collection.findOne({email : email})
        } catch (err) {
            errorLogger.error(err);           
        }
    }
}

module.exports = UserDaoMongoDb