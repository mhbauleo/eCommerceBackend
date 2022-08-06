const ProductosDaoArchivo = require('./ProductosDaoArchivo')
const ProductosDaoMongoDb = require('./ProductosDaoMongoDb')

class ProductosFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new ProductosDaoMongoDb()
            case 'FILE': return new ProductosDaoArchivo()
            default: return new ProductosDaoMongoDb()
        }
    }
}

module.exports = ProductosFactoryDao