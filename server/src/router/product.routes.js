const express = require('express')
const router = express.Router()

const { addProduct } = require('../controllers/products.controller.js')
const { AdminRole } = require('../middlewere/PrivateRoutes')
const upload = require('../middlewere/UploadHandler')

router.post(
  '/add',
  upload.fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'gallery', maxCount: 12 },
  ]),
  addProduct,
)

module.exports = router
