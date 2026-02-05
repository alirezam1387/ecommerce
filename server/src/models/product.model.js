const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mainPhoto: {
    type: String,
    default: "no-photo.jpg",
    required: true,
  },
  gallery: [
    {
      type: String,
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
  colors: [
    {
      type: String,
    },
  ],
  size: [
    {
      type: String,
    },
  ],
  OffNum: {
    type: Number,
    default: undefined,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  catRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sellCount: {
    type: Number,
    default: 0,
  },
  links: {
    instagram: { type: String, default: "" },
    telegram: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
