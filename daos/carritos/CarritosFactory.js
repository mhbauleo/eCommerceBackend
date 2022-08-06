const CarritosDaoArchivo = require('./CarritosDaoArchivo')
const CarritosDaoMongoDb = require('./CarritosDaoMongoDb')

class CarritosFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new CarritosDaoMongoDb()
            case 'FILE': return new CarritosDaoArchivo()
            default: return new CarritosDaoMongoDb()
        }
    }
}

module.exports = CarritosFactoryDao