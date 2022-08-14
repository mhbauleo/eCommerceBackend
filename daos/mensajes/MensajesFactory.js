const MensajesDaoMongoDb = require('./MensajesDaoMongoDb')

class MensajesFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new MensajesDaoMongoDb()
            default: return new MensajesDaoMongoDb()
        }
    }
}

module.exports = MensajesFactoryDao