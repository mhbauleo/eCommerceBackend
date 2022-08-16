const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, carrito } = require("./daos/index");
const { errorLogger, warnLogger, logger } = require("./helpers/logger");;
const { createHash, isValidPassword } = require("./helpers/bcrypt")

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, email, password, done) => {
        const { nombre, direccion, edad, telefono } = req.body;
        try {
          const user = await User.getUserByEmail(email);

          if (user) {
            logger.warn("Usuario existente");
            warnLogger.warn("Usuario existente");
            return done(null, false, {
              status: "Error",
              message: "User already registered",
            });
          }

          const newUser = {
            nombre,
            email,
            direccion,
            edad,
            telefono,
            password: createHash(password),
            idCarrito: await carrito.crear(),
            rol: "member",
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
          if (!email || !password)
            return done(null, false, {
              message:
                "Se debe agregar un email y una contraseña para loggearse",
            });

          const user = await User.getUserByEmail(email);

          if (!user) {
            logger.info(`User no found with email ${email}`);
            return done(null, false, {
              status: "Error",
              message: "The email or password is incorrect",
            });
          }

          if (!isValidPassword(user, password)) {
            logger.info("Invalid password");
            return done(null, false, {
              status: "Error",
              message: "The email or password is incorrect",
            });
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
};

module.exports = { initializePassport }