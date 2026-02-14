const multer = require('multer')

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
    console.log('checked')
  } else {
    cb(new Error('Invalid file type, only PNG and JPEG is allowed!'), false)
  }
}

const image_upload = multer({
  dest: `${__dirname}/../../uploads/images`,
  fileFilter,
})

module.exports = image_upload
