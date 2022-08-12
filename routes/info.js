const express = require("express");
const router = express.Router();

const { mostrarVistaInfo } = require('../controllers/info')

router.get("/", mostrarVistaInfo);

module.exports = router;
