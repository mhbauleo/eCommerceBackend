const express = require("express");
const router = express.Router();

const { mostrarVistaInfo } = require('../controllers/infoController')

router.get("/", mostrarVistaInfo);

module.exports = router;
