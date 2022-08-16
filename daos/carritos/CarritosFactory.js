const CarritosDaoMongoDb = require('./CarritosDaoMongoDb')

class CarritosFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new CarritosDaoMongoDb()
            default: return new CarritosDaoMongoDb()
        }
    }
}

module.exports = CarritosFactoryDao