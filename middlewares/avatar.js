const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/avatar");
  },
  filename: (req, file, callback) => {
    const originalNameSplited = file.originalname.split('.')
    const ext = originalNameSplited[originalNameSplited.length - 1]
    const newAvatar= `${req.user._id}.${ext}`
    callback(null, newAvatar);
  },
});
const upload = multer({ storage: storage });

module.exports = {upload}