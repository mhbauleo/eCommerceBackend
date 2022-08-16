const verifyCart = (req, res, next) => {
    if(req.params.id === req.user.idCarrito || req.user.rol === 'admin') {
        next()
    } else {
        res.status(403).json({ message: "Access to that resource is forbidden." });
    }
}

module.exports = { verifyCart }