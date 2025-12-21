const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^09\d{9}$/],
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  postalCode: {
    type: String,
    required: false,
    match: [/^\d{10}$/],
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// compate password
userSchema.methods.ComparePass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// sign jwt
userSchema.methods.SignJWT = async function () {
  // access token
  const accessToken = jwt.sign({_id: this.id}, process.env.JWT_SECURE_CODE, {
    expiresIn: '15m'
  })

  // refresh token
  const refreshToken = jwt.sign({_id: this.id}, process.env.JWT_SECURE_CODE, {
    expiresIn: '7d'
  })
  return {accessToken, refreshToken}
}

module.exports = mongoose.model("User", userSchema);
