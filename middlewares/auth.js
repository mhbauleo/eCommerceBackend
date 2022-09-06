const { verifyWebToken } = require("../helpers/jws");
const { logger } = require("../helpers/logger");

const authorizeToken = (req) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return null;
    const token = authorization.split(" ")[1];
    if (!token) null;
    return verifyWebToken(token);
  } catch (e) {
    logger.info(e);
  }
};

const auth = async (req, res, next) => {
  const userData = authorizeToken(req);
  if (userData) {
    req.user = userData
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const verifyAdminRole = async (req, res, next) => {
    if(req.user.rol === 'admin') {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized: requiere rol de administrador" });
    }
}

module.exports = { auth, verifyAdminRole };
