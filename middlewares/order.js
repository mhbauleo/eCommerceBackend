const verifyEmail = async (req, res, next) => {
  console.log(req.user);
  if (req.user.email === req.body.email) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { verifyEmail }