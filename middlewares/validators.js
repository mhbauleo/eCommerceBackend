const productosJoiSchema = require('../schemas/joi/productosJoiSchema')
const userJoiSchema = require('../schemas/joi/userJoiSchema')
const orderJoiSchema = require('../schemas/joi/ordenesJoiSchema')

const JoiValidator = (req, res, next, joiSchema) => {
    const { error } = joiSchema.validate(req.body)
    if(error) {
        res.status(422).json({ message: error.details[0].message })
    } else {
        next()
    }
}

const productJoiValidator = (req, res, next) => {
    JoiValidator(req, res, next, productosJoiSchema)
}

const userJoiValidator = (req, res, next) => {
    JoiValidator(req, res, next, userJoiSchema)
}

const orderJoiValidator = (req, res, next) => {
    JoiValidator(req, res, next, orderJoiSchema)
}

module.exports = { productJoiValidator, userJoiValidator, orderJoiValidator}