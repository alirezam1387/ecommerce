const express = require('express')
const router = express.Router()
const { addProduct } = require('../controllers/products.controller.js')
const { AdminRole } = require('../middlewere/PrivateRoutes')
const image_upload = require('../middlewere/UploadHandler')

const fun = (req, res, next) => {
  console.log('test1')
  next()
}

const fun2 = (req, res, next) => {
  console.log('test2')
  next()
}
router.post(
  '/add_product',
  fun,
  image_upload.single('images'),
  fun2,
  addProduct,
)

module.exports = router
