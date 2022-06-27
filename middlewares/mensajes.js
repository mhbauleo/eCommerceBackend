const { sendSms, sendWsppToAdmin } = require('../helpers/twilio')
const { sendEmail } = require('../helpers/mail')

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
module.exports = {enviarInfoAlAdmin, enviarMensajeAUsuario}