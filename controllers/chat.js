const mostrarVistaChat = (req, res) => {
    res.render("layouts/chat");
}

const mostrarVistaChatEmail = (req, res) => {
    console.log(req.params.email)
    res.cookie("messagesEmail", req.params.email).render("layouts/chat-email");
}

const mostrarVistaChatAdmin = (req, res) => {
    res.render("layouts/chat-admin");
}

module.exports = { mostrarVistaChat, mostrarVistaChatEmail, mostrarVistaChatAdmin }