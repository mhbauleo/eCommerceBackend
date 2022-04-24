const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')
const config = require('../../config')

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(`${config.fileSystem.baseUrl}productos.txt`)
    }
}

module.exports = ProductosDaoArchivo