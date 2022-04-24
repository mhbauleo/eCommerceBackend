const admin = require("firebase-admin");
const config = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
  databaseURL: "https://ecommerce-f8d35-default-rtdb.firebaseio.com",
});

class ContenedorFirebase {
  constructor(collection) {
    const db = admin.firestore();
    this.collection = db.collection(collection);
  }

  // Principales

  async save(objeto) {
    try {
      const newTimestamp = Date.now()
      const newElement = await this.collection.add({...objeto, timestamp : newTimestamp});
      return newElement.id;
    } catch (e) {
      console.log(e);
    }
  }

  // Devuelve null en caso de no encontrar el objeto
  async getById(idBuscado) {
    try {
      const doc = this.collection.doc(`${idBuscado}`);
      const item = await doc.get();
      const response = item.data();
      return response == undefined ? null : response;
    } catch (e) {
      console.log(e);
    }
  }

  async getAll() {
    try {
      const querySnapshot = await this.collection.get();
      let docs = querySnapshot.docs;
      const res = docs.map((doc) => doc.data());
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async updateById(newObject, id) {
    try {
      const newTimestamp = Date.now()
      const doc = this.collection.doc(`${id}`);
      await doc.update({...newObject , timestamp : newTimestamp});
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  async deleteById(id) {
    try {
      if ((await this.getById(id)) != null) {
        const doc = this.collection.doc(`${id}`);
        await doc.delete();
        return 1;
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ContenedorFirebase