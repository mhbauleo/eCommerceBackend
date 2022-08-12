const Joi = require('joi')

const joiOrderSchema = Joi.object({
    estado: Joi.string().required(),
    email: Joi.string().required()
})

module.exports = joiOrderSchema