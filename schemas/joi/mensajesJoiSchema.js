const Joi = require('joi')

const joiMessagesSchema = Joi.object({
    email: Joi.string().required(),
    tipo: Joi.string().valid('usuario', 'sistema').required(),
    text: Joi.string().required(),
    fecha: Joi.string().required()
})

module.exports = joiMessagesSchema