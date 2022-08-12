const express = require("express");
const router = express.Router();

const { mostrarVistaChat, mostrarVistaChatEmail } = require('../controllers/chat')

router.get("/",  mostrarVistaChat)
router.get("/:email",  mostrarVistaChatEmail)

module.exports = router;
