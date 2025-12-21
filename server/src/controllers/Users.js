const AsyncHandler = require("../utils/asyncHandller");
const ErrorHandler = require("../middlewere/ErrorHandler");
const UserModel = require("../models/User");
const User = require("../models/User");

const register = AsyncHandler(async (req, res, next) => {
  const { name, username, email, password, phoneNumber } = req.body;
  const newUser = new UserModel({
    name,
    username,
    email,
    password,
    phoneNumber,
  });
  await newUser.save();
  res.send({
    message: "user created successfuly",
    user: { name, username, email, phoneNumber },
  });
});

module.exports = { register };
