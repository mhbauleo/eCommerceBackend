const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb')
const productosEsquema = require ('../../models/productos')

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('productos', productosEsquema)
    }
}

module.exports = ProductosDaoMongoDb