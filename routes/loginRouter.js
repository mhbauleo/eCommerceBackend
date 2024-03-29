const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const config = require("../config");
const { initializePassport } = require("../passport-config")

const {
  notificarNuevoUsuario
} = require("../middlewares/mail");
const { passportCall } = require('../middlewares/passport')
const { userJoiValidator } = require('../middlewares/validators')

const {
  mostrarInicio,
  mostrarVistaLogin,
  mostrarVistaRegister,
  register,
  login
} = require("../controllers/loginController");

const router = express.Router();

/*----------------------- Session -----------------------*/

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

router.use(cookieParser());
router.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO.BASE_URL,
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

initializePassport()

/*----------------------- Rutas -----------------------*/

router.get("/register", mostrarVistaRegister);
router.get("/login", mostrarVistaLogin);
router.get("/", mostrarInicio)

router.post(
  "/register",
  userJoiValidator,
  passportCall('register'),
  notificarNuevoUsuario,
  register
);

router.post(
  "/login",
  passportCall('login'),
  login
);

module.exports = router;
