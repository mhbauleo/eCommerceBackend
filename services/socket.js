const { Server } = require('socket.io')
const { mensajes } = require('../daos/index')
const mensajesJoiSchema = require('../schemas/joi/mensajesJoiSchema')

class Socket {
    constructor(server) {
        this.io = new Server(server)
        this.chatDB = mensajes
        this.on()
    }

    on() {
        this.io.on('connection', async (socket) => {
            console.log("Nuevo cliente conectado!");
            socket.emit("mensajes", await this.chatDB.getAll());

            socket.on("mensajes", async (data) => {
                const { error } = mensajesJoiSchema.validate(data)
                if(error) return console.log(error.details[0].message)

                await this.chatDB.save(data)
                this.io.sockets.emit("mensajes", await this.chatDB.getAll());
            })
        })
    }
}

module.exports = Socket