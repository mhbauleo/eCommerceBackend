const verifyCart = (req, res, next) => {
    console.log('verify cart')
    console.log(req.user)
    if(req.params.id === req.user.idCarrito || req.user.rol === 'admin') {
        next()
    } else {
        res.status(403).json({ message: "Access to that resource is forbidden." });
    }
}

module.exports = { verifyCart }