const mongoose = require("mongoose")

const productosEsquema = new mongoose.Schema({
    nombre: {type: String, require: true},
    descripcion: {type:String, require: true},
    codigo: {type:String, require: true},
    foto: {type:String, require: true},
    precio: {type:Number, require: true},
    stock: {type:Number, require: true}
},{ timestamps: true })

module.exports = productosEsquema