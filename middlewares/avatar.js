const { User } = require('../daos/index')
const {warnLogger} = require('../helpers/logger')

const updateAvatar = async (req, res, next) => {
    await User.updateAvatar(req.file?.filename, req.user._id)
    next()
}

const checkImage = async (req, res ,next) => {
    if(!req.file) {
        warnLogger.warn("No se adjunto ninguna imagen")
        res.redirect('/user')
    } else {
        next()
    }
}

module.exports = {updateAvatar, checkImage}