const { sendEmail } = require("../helpers/mail");

const notificarNuevoUsuario = (req, res, next) => {
  console.log("notificar")
  const { nombre, email, direccion, edad, telefono, _id } = req.user;
  sendEmail(
    "Nuevo registro",
    `<h2>Nombre: </h2><p>${nombre}</p>
      <h2>Email: </h2><p>${email}</p>
      <h2>Direccion: </h2><p>${direccion}</p>
      <h2>Edad: </h2><p>${edad}</p>
      <h2>Telefono: </h2><p>${telefono}</p>
      <h2>Id: </h2><p>${_id}</p>`
  );
  next();
};

module.exports = { notificarNuevoUsuario };
