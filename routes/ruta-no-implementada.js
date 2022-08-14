const express = require('express')
const router = express.Router()

const { rutaNoImplementada } = require('../controllers/ruta-no-implementada')

router.all('*', rutaNoImplementada)

module.exports = router