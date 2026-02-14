import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

export const getCrmStats = async (req, res) => {
  const stats = {
    totalProducts: await Product.countDocuments(),
    totalOrders: await Order.countDocuments(),
    totalCategories: await Category.countDocuments(),
    totalUsers: await User.countDocuments()
  };

  res.json(stats);
};