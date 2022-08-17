const config = require('../config')

const mostrarVistaInfo = (req, res) => {
    const { NODE_ENV, PORT, MODO, PERSISTENCIA, EXPIRE_TIME, GMAIL } = config
    const { ADMIN_MAIL } = GMAIL
    res.render("layouts/info", { NODE_ENV, PORT, MODO, PERSISTENCIA, EXPIRE_TIME, ADMIN_MAIL });    
}

module.exports = { mostrarVistaInfo }