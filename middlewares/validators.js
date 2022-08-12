const productosJoiSchema = require('../schemas/joi/productosJoiSchema')
const userJoiSchema = require('../schemas/joi/userJoiSchema')
const orderJoiSchema = require('../schemas/joi/ordenesJoiSchema')

const productJoiValidator = (req, res, next) => {
    const { error } = productosJoiSchema.validate(req.body)
    if(error) {
        res.status(422).json({ message: error.details[0].message })
    } else {
        next()
    }
}

const userJoiValidator = (req, res, next) => {
    const { error } = userJoiSchema.validate(req.body)
    if(error) {
        res.status(422).json({ message: error.details[0].message })
    } else {
        next()
    }
}

const orderJoiValidator = (req, res, next) => {
    const { error } = orderJoiSchema.validate(req.body)
    if(error) {
        res.status(422).json({ message: error.details[0].message })
    } else {
        next()
    }
}

module.exports = { productJoiValidator, userJoiValidator, orderJoiValidator}