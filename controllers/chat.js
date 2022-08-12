const mostrarVistaChat = (req, res) => {
    res.render("layouts/chat");
}

const mostrarVistaChatEmail = (req, res) => {
    req.params.email
    res.render("layouts/chat");

}

module.exports = { mostrarVistaChat, mostrarVistaChatEmail}