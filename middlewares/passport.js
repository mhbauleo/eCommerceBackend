const passport = require('passport')

const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        console.log("error passportcall")
        return next(err)};
      if (!user) {
        console.log(info)
        return res.json(info);
      }
      req.user = user;
      console.log(req.user)
      console.log('saved')
      next();
    })(req, res, next);
  };
};

module.exports = { passportCall }