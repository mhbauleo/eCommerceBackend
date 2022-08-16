const ProductosDaoMongoDb = require('./ProductosDaoMongoDb')

class ProductosFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new ProductosDaoMongoDb()
            default: return new ProductosDaoMongoDb()
        }
    }
}

module.exports = ProductosFactoryDao