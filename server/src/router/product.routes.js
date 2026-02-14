const express = require('express')
const router = express.Router()
const { addProduct } = require('../controllers/products.controller.js')
const { AdminRole } = require('../middlewere/PrivateRoutes')


router.post('/add_product', AdminRole, addProduct)

module.exports = router
