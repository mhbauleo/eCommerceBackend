const express = require("express");
const router = express.Router();

const { mostrarVistaChat, mostrarVistaChatEmail, mostrarVistaChatAdmin } = require('../controllers/chatController')

router.get("/",  mostrarVistaChat)
router.get("/admin", mostrarVistaChatAdmin)
router.get("/:email",  mostrarVistaChatEmail)


module.exports = router;
