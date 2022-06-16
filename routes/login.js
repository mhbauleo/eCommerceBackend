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
      ttl: 60,
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
        console.log(user);
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
        };

        return done(null, { _id: await User.save(newUser) });
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
    res.render("layouts/form", {nombre: req.user?.nombre});
  } else {
    res.render("layouts/login");
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
  }),
  (req, res) => {
    res.render("layouts/form", {nombre: req.user?.nombre});
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
