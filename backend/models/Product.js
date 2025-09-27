import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
