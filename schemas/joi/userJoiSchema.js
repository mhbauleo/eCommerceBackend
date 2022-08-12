const Joi = require('joi')

const joiUserSchema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().required(),
    direccion: Joi.string().required(),
    edad: Joi.number().required(),
    telefono: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = joiUserSchema