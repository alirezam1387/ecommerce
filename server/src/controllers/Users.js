const AsyncHandler = require("../utils/asyncHandller");
const ErrorHandler = require("../middlewere/ErrorHandler");
const UserModel = require("../models/User");
const User = require("../models/User");
const SaveJWT = require('../utils/jwtSign');
const jwt = require("jsonwebtoken");

const register = AsyncHandler(async (req, res, next) => {
  const { name, username, email, password, phoneNumber } = req.body;
  const newUser = new UserModel({
    name,
    username,
    email,
    password,
    phoneNumber,
  })
  await newUser.save();

  SaveJWT(newUser, res, 'user created successfuly')
});

const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) next(new ErrorHandler('email or password ', 400))

  let user = await UserModel.findOne({ email }).select('+password')
  if (!user) next(new ErrorHandler('email or password is not correct', 400))

  const isValid = await user.ComparePass(password)
  console.log('contoler: ', isValid)
  if (!isValid) {
    return next(new ErrorHandler('email or password is not correct', 400))
  }


  SaveJWT(user, res, 'user login successfuly')
})

const getRefreshToken = AsyncHandler(async (req, res, next) => {
  // console.log(req.cookies)
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) next(new ErrorHandler('user is not login', 400))
  const userId = await jwt.verify(refreshToken, process.env.JWT_SECURE_CODE)._id

  // access token
  const accessToken = jwt.sign({ _id: userId }, process.env.JWT_SECURE_CODE, {
    expiresIn: '15m'
  })


  const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict'
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 15 * 60 * 1000)
  }).status(200).json({
    message: 'accessToken generate successfuly'
  })
})

const logout = AsyncHandler(async (req, res, next) => {
  res.clearCookie('refreshToken')
  res.clearCookie('accessToken').status(200).json({
    message: 'user logout successfuly'
  })
})


module.exports = { register, login, getRefreshToken, logout };