const OrdenesDaoMongoDb = require('./OrdenesDaoMongoDb')

class OrdenesFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new OrdenesDaoMongoDb()
            default: return new OrdenesDaoMongoDb()
        }
    }
}

module.exports = OrdenesFactoryDao