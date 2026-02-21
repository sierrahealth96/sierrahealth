import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    price: Number,
    description: String,
    images: [String],
    isBestSeller: { type: Boolean, default: false },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
