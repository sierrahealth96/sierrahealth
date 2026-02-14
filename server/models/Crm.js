import mongoose from "mongoose";

const crmSchema = new mongoose.Schema(
  {
    totalProducts: Number,
    totalOrders: Number,
    totalCategories: Number,
    totalUsers: Number
  },
  { timestamps: true }
);

export default mongoose.model("Crm", crmSchema);