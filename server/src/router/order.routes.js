const express = require('express')
const router = express.Router()

const { CreateOrder, EditOrder, GetOrderData } = require('../controllers/orders.controller')

const { isLogin, AdminRole } = require('../middlewere/PrivateRoutes')

router.post('/', isLogin, CreateOrder)
router.put('/edit/:id', isLogin, AdminRole, EditOrder)
router.get('/:id', isLogin, GetOrderData)

module.exports = router