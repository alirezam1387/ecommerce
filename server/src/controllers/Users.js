const AsyncHandler = require("../utils/asyncHandller");
const ErrorHandler = require("../middlewere/ErrorHandler");
const UserModel = require("../models/User");
const User = require("../models/User");
const SaveJWT = require('../utils/jwtSign')

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
  console.log('contoler: ',isValid)
  if (!isValid) {
    return next(new ErrorHandler('email or password is not correct', 400))
  }

  
  SaveJWT(user,res, 'user login successfuly')
})

module.exports = { register, login };
