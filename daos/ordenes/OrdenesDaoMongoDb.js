const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const UserDaoMongoDb = require("../user/UserDaoMongoDb");
const CarritosDaoMongoDb = require("../carritos/CarritosDaoMongoDb");
const ordenesModel = require("../../schemas/ordenes");
const { logger } = require("../../helpers/logger")


class OrdenesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(ordenesModel);
    this.user = new UserDaoMongoDb();
    this.carritos = new CarritosDaoMongoDb();
  }

  async newOrder(email, estado) {
    try {
      const user = await this.user.getUserByEmail(email);
      const productos = await this.carritos.getProductos(user.idCarrito);

      const items = [];
      const count = {};

      for (const producto of productos) {
        if (count[producto._id]) {
          count[producto._id].cantidad++;
        } else {
          count[producto._id] = { producto, cantidad: 1 };
        }
      }

      for (const id in count) {
        items.push(count[id]);
      }

      return { nroOrden: await this.save({ items, estado, email }), items };
    } catch (e) {
      logger.info(e)
    }
  }
}

module.exports = OrdenesDaoMongoDb;
