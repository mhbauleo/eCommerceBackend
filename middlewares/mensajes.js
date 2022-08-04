const { sendSms, sendWsppToAdmin } = require('../helpers/twilio')
const { sendEmail } = require('../helpers/mail')

const notificarNuevoUsuario = (req, res, next) => {
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
    next()
  }

const enviarInfoAlAdmin = async (req ,res, next) => {
    const msg = `Nuevo pedido de ${req.user?.nombre} (${req.user?.email})`
    const productos = req.body
    const htmlList = productos.map(producto => 
    `<li>
    <h2>Nombre: </h2><p>${ producto.nombre }</p>
    <h2>Descripción: </h2><p>${ producto.descripcion }</p>
    <h2>Código: </h2><p>${ producto.codigo }</p>
    <h2>Precio: </h2><p>${ producto.precio }</p>
    <h2>Stock: </h2><p>${ producto.stock }</p>
    <h2>Foto: </h2><img src="${ producto.foto }">
    <h2>Id: </h2><p>${ producto._id }</p>
    </li>`)
    const html = "<ul>" + htmlList.join(" ") + "</ul>"

    sendEmail(msg, html)
    sendWsppToAdmin(msg)  
    next()  
}

const enviarMensajeAUsuario = async (req, res, next) => {
    const telefono = req.user?.telefono
    sendSms('Su pedido ha sido recibido y se encuentra en proceso', telefono)
    next()
}
module.exports = {notificarNuevoUsuario, enviarInfoAlAdmin, enviarMensajeAUsuario}