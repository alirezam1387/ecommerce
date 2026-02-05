const express = require('express')
const router = express.Router()
const { addProduct } = require('../controllers/Products.js')

router.post('/add_product', addProduct)

module.exports = router
