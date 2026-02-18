const express = require('express')
const router = express.Router()

const { addProduct, getProduct, editProduct, deleteProduct, getAllProducts } = require('../controllers/products.controller.js')
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

router.get('/', getAllProducts)

router.route('/:id')
  .get(getProduct)
  .put(upload.fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'gallery', maxCount: 12 },
  ]), editProduct)
  .delete(deleteProduct)

module.exports = router
