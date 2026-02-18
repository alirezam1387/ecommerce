const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "DELIVERED", "CANCELLED", "INWAY"],
    default: "PENDING",
  },
  items: {
    type: Array,
    required: true
  },
  postStatus: {
    type: Number, 
    defualt: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
