const UserDaoMongoDb = require('./UserDaoMongoDb')

class UserFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new UserDaoMongoDb()
            default: return new ProductosDaoMongoDb()
        }
    }
}

module.exports = UserFactoryDao