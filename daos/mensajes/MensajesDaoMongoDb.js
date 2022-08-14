const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const mensajesModel = require("../../schemas/mensajes");

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(mensajesModel);
  }
}

module.exports = MensajesDaoMongoDb;
