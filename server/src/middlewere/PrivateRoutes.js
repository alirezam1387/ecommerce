const ErrorHandler = require("../middlewere/ErrorHandler");
const jwt = require("jsonwebtoken")
const userModel = require('../models/User')

exports.isLogin = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return next(new ErrorHandler('user is not authenticated', 403))

    // check jwt
    try {
        const verify = jwt.verify(refreshToken, process.env.JWT_SECURE_CODE)
        if (!refreshToken) return next(new ErrorHandler('user is not authenticated', 403))
        req.user = await userModel.findById(verify._id).select('-password').select('-otp')
        next()
    } catch (err) {
        next(err)
    }
}

exports.AdminRole = async (req, res, next) => {
    try {
        if (req.user.role !== 'ADMIN') return next(new ErrorHandler('user is not authenticated as an admin', 403))
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}