const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb')
const userEsquema = require ('../../models/user')
const bcrypt = require("bcrypt");

class UserDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('user', userEsquema)
    }

    async getUserByEmail(email) {
        try {
            return await this.collection.findOne({email : email})
        } catch (err) {
            console.log(err)            
        }
    }
}

module.exports = UserDaoMongoDb