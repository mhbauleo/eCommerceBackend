const Joi = require('joi')
const joiProductsSchema = require('./productosJoiSchema')

const joiCartSchema = Joi.object({
    productos: Joi.array().items(joiProductsSchema)
})

module.exports = joiCartSchema