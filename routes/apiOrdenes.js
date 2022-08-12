const express = require("express");
const router = express.Router();

const { newOrder } = require('../controllers/ordenes')
const { auth } = require('../middlewares/auth')
const { verifyEmail } = require('../middlewares/order')
const { orderJoiValidator } = require('../middlewares/validators')

router.post("/", auth, orderJoiValidator, verifyEmail, newOrder)

module.exports = router;