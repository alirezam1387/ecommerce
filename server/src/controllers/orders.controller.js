const ErrorHandler = require("../middlewere/ErrorHandler");
const Order = require("../models/order.model");
const AsyncHandler = require("../utils/asyncHandller");

exports.CreateOrder = AsyncHandler(async (req, res, next) => {
    const { address, items } = req.body
    const userRef = req.user._id

    const order = await Order.create({ address, items, userRef })

    res.status(200).json({
        success: true,
        orderId: order._id
    })
})

exports.EditOrder = AsyncHandler(async (req, res, next) => {
    const orderId = req.params.id
    const status = req.body.status || undefined
    const postStatus = req.body.postStatus || undefined

    const order = await Order.findById(orderId)
    if (!order) return next(new ErrorHandler('there is no order with this id', 404))

    
    if (status) order.status = status
    if (postStatus) order.postStatus = postStatus
    
    
    await order.save()

    res.status(200).json({
        success: true,
        message: 'order changed successfuly',
        orderId: order._id
    })
})

exports.GetOrderData = AsyncHandler(async (req, res, next) => {
    const orderId = req.params.id

    const order = await Order.findById(orderId)
    if (!order) return next(new ErrorHandler('there is no order with this id', 404))

    res.status(200).json({
        success: true,
        order
    })
})