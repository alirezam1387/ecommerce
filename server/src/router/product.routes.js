const express = require('express')
const router = express.Router()
const { addProduct } = require('../controllers/products.controller.js')
const { AdminRole } = require('../middlewere/PrivateRoutes')
const upload = require('../middlewere/UploadHandler')

router.post(
  '/add_product',
  upload.single('images'),
  addProduct,
)

module.exports = router
