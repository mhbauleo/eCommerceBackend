const Joi = require('joi')

const joiProductsSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    categoria: Joi.string().required(),
    codigo: Joi.string().required() ,
    foto: Joi.string().required() ,
    precio: Joi.number().required() ,
    stock: Joi.number().required()
})

module.exports = joiProductsSchema