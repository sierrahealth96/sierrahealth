import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productName: String,
        quantity: Number
      }
    ],
    message: String
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);