const config = require('../config')

const mostrarVistaInfo = (req, res) => {
    const { NODE_ENV, PORT, MODO, PERSISTENCIA, EXPIRE_TIME, gmail} = config
    const { adminMail } = gmail
    res.render("layouts/info", { NODE_ENV, PORT, MODO, PERSISTENCIA, EXPIRE_TIME, adminMail});    
}

module.exports = { mostrarVistaInfo }