const passport = require('passport')

const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err)};
      if (!user) {
        return res.json(info);
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = { passportCall }