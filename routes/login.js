const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const { User } = require("../daos/index");
const config = require("../config");
const {errorLogger, warnLogger, logger} = require('../helpers/logger')
const {sendEmail} = require('../helpers/mail')
const {carrito} = require('../daos/index')

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
          logger.warn("Datos insuficientes")
          warnLogger.warn("Datos insuficientes")
          return done(null, false);
        }
        const user = await User.getUserByEmail(email);

        if (user) {
          logger.warn("Usuario existente")
          warnLogger.warn("Usuario existente")
          return done(null, false);
        }

        const newUser = {
          nombre,
          email,
          direccion,
          edad,
          telefono,
          password: createHash(password),
          idCarrito: await carrito.crear()
        };
        return done(null, await User.saveAndGetUser(newUser));
      } catch (err) {
        logger.error(err)
        errorLogger.error(err)
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
          logger.info(`User no found with email ${email}`)
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          logger.info("Invalid password")
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        errorLogger.error(err)
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

router.get("/register", (req, res) => {
  res.render("layouts/register");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register-error",
  }),
  (req, res) => {
    const { nombre, email, direccion, edad, telefono, _id } = req.user
    sendEmail('Nuevo registro', 
    `<h2>Nombre: </h2><p>${ nombre }</p>
    <h2>Email: </h2><p>${ email }</p>
    <h2>Direccion: </h2><p>${ direccion }</p>
    <h2>Edad: </h2><p>${ edad }</p>
    <h2>Telefono: </h2><p>${ telefono }</p>
    <h2>Id: </h2><p>${ _id }</p>`)
    req.logOut((err) => {
      res.redirect("/login");
    });
  }
);

router.get("/register-error", (req, res) => {
  res.render("layouts/register-error");
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.cookie("idCarrito", req.user?.idCarrito).render("layouts/form", {nombre: req.user?.nombre});
  } else {
    res.render("layouts/login");
  }
});

router.get("/productos", (req, res) => {
  if (req.isAuthenticated()) {
    res.cookie("idCarrito", req.user?.idCarrito).render("layouts/productos", {nombre: req.user?.nombre});
  } else {
    res.redirect("/login");
  }
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    const { nombre, email, edad, direccion, telefono} = req.user
    res.render("layouts/user", {nombre, email,edad,direccion,telefono});
  } else {
    res.redirect("/login");
  }
});

router.get("/carrito", (req, res) => {
  if (req.isAuthenticated()) {
    res.cookie("idCarrito", req.user?.idCarrito).render("layouts/cart", {nombre: req.user?.nombre});
  } else {
    res.redirect("/login");
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
  }),
  (req, res) => {
    res.cookie("idCarrito", req.user?.idCarrito).render("layouts/form", {nombre: req.user?.nombre});
  }
);

router.get("/login-error", (req, res) => {
  res.render("layouts/login-error");
});

router.get("/logout", (req, res) => {
  let nombre = req.user?.nombre;
  console.log(`antes: ${JSON.stringify(req.user)}`);
  req.logOut((err) => {
    console.log(`despues: ${req.user}`);
    res.render("layouts/logout", { nombre });
  });
});

/*----------------------- Aux -----------------------*/

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

module.exports = router;
