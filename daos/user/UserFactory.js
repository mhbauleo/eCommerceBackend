const UserDaoMongoDb = require('./UserDaoMongoDb')

class UserFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new UserDaoMongoDb()
            default: return new UserDaoMongoDb()
        }
    }
}

module.exports = UserFactoryDao