// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       quantity: Number
//     }
//   ],
//   total: Number,
//   status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered"], default: "pending" },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Order", orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);