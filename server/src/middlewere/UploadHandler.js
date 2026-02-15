const multer = require('multer')
const path = require('path')

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/') // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  },
})

// File filter (optional - only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mime = allowedTypes.test(file.mimetype)

  if (ext && mime) {
    cb(null, true)
  } else {
    cb('Only images are allowed!')
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB
  fileFilter,
})

module.exports = upload

