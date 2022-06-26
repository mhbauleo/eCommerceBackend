const { User } = require('../daos/index')

const updateAvatar = async (req, res, next) => {
    const count = await User.updateAvatar(req.file.filename, req.user._id)
    next()
}

module.exports = {updateAvatar}