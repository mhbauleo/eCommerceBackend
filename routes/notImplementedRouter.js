const express = require('express')
const router = express.Router()

const { rutaNoImplementada } = require('../controllers/notImplementedRouter')

router.all('*', rutaNoImplementada)

module.exports = router