import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  total: Number,
  status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
