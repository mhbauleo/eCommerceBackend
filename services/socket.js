const { Server } = require('socket.io')

class Socket {
    constructor(server) {
        this.io = new Server(server)
        this.chatDB = []
        this.on()
    }

    on() {
        this.io.on('connection', async (socket) => {
            console.log("Nuevo cliente conectado!");
            socket.emit("mensajes", this.chatDB);

            socket.on("mensajes", (data) => {
                this.chatDB.push(data)
                this.io.sockets.emit("mensajes", this.chatDB);
            })
        })
    }
}

module.exports = Socket