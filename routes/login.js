const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const { User, carrito } = require("../daos/index");
const config = require("../config");
const { errorLogger, warnLogger, logger } = require("../helpers/logger");;

const { upload } = require("../middlewares/multer");
const { updateAvatar, checkImage } = require("../middlewares/avatar");
const {
  notificarNuevoUsuario,
  enviarInfoAlAdmin,
  enviarMensajeAUsuario,
} = require("../middlewares/mensajes");

const { comprar } = require("../controllers/carrito");
const {
  mostrarVistaHome,
  mostrarVistaProductos,
  mostrarVistaUser,
  mostrarVistaCarrito,
} = require("../controllers/vistas");
const {
  mostrarVistaLogin,
  mostrarVistaLoginError,
  mostrarVistaRegister,
  mostrarVistaRegisterError,
  mostrarVistaLogout,
  registrarNuevoUsuario,
  iniciarSesion,
  actualizarUsuario,
} = require("../controllers/login");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/*----------------------- Session -----------------------*/

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

router.use(cookieParser());
router.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.baseUrl,
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

/*----------------------- Passport -----------------------*/

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const { nombre, direccion, edad, telefono } = req.body;
      try {
        if (
          !email ||
          !nombre ||
          !direccion ||
          !edad ||
          !telefono ||
          !password
        ) {
          logger.warn("Datos insuficientes");
          warnLogger.warn("Datos insuficientes");
          return done(null, false);
        }
        const user = await User.getUserByEmail(email);

        if (user) {
          logger.warn("Usuario existente");
          warnLogger.warn("Usuario existente");
          return done(null, false);
        }

        const newUser = {
          nombre,
          email,
          direccion,
          edad,
          telefono,
          password: createHash(password),
          idCarrito: await carrito.crear(),
          avatar: "avatar.jpg",
        };
        return done(null, await User.saveAndGetUser(newUser));
      } catch (err) {
        logger.error(err);
        errorLogger.error(err);
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.getUserByEmail(email);

        if (!user) {
          logger.info(`User no found with email ${email}`);
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          logger.info("Invalid password");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        errorLogger.error(err);
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  done(null, await User.getById(id));
});

/*----------------------- Rutas -----------------------*/

router.get("/register", mostrarVistaRegister);
router.get("/register-error", mostrarVistaRegisterError);
router.get("/login", mostrarVistaLogin);
router.get("/login-error", mostrarVistaLoginError);
router.get("/logout", mostrarVistaLogout);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register-error",
  }),
  notificarNuevoUsuario,
  registrarNuevoUsuario
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
  }),
  iniciarSesion
);

router.get("/home", mostrarVistaHome);
router.get("/productos", mostrarVistaProductos);
router.get("/user", mostrarVistaUser);
router.get("/carrito", mostrarVistaCarrito);

router.post(
  "/carrito/comprar",
  enviarInfoAlAdmin,
  enviarMensajeAUsuario,
  comprar
);

router.post(
  "/update",
  upload.single("avatar"),
  checkImage,
  updateAvatar,
  actualizarUsuario
);

/*----------------------- Aux -----------------------*/

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

module.exports = router;
