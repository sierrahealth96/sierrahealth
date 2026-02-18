// controllers/orderController.js
import dayjs from "dayjs";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import {
  sendOrderEmailToAdmin,
  sendOrderEmailToUser
} from "../services/emailSend.js";

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      products = [],
      message
    } = req.body;

    // 1️⃣ Create user (lead)
    const user = await User.create({
      name: customerName,
      email,
      phone
    });

    // 2️⃣ Normalize product ids
    const orderProducts = products.map(p => ({
      product: p.productId,
      quantity: p.quantity || 1
    }));

    // 3️⃣ Create order
    const order = await Order.create({
      user: user._id,
      products: orderProducts,
      message
    });

    // 4️⃣ Fetch full product info for emails
    const populatedProducts = products.length
      ? await Product.find({
          _id: { $in: products.map(p => p.productId) }
        })
      : [];

    // merge quantity for email
    const emailProducts = populatedProducts.map(p => {
      const match = products.find(
        x => String(x.productId) === String(p._id)
      );
      return {
        name: p.name,
        quantity: match?.quantity || 1
      };
    });

    // 5️⃣ Admin email
      sendOrderEmailToAdmin({
      adminEmail: process.env.EMAIL,
      name: customerName,
      email,
      phone,
      products: emailProducts,
      message
    });

    // 6️⃣ User email
    if (email) {
        sendOrderEmailToUser({
        to: email,
        name: customerName,
        phone,
        products: emailProducts
      });
    }

    res.status(201).json({
      message: "Inquiry submitted successfully",
      orderId: order._id
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      message: "Failed to submit inquiry",
      error: error.message
    });
  }
};

export const getOrdersByDate = async (req, res) => {
  const { date } = req.query;

  let filter = {};

  if (date) {
    const start = dayjs(date).startOf("day").toDate();
    const end = dayjs(date).endOf("day").toDate();
    filter.createdAt = { $gte: start, $lte: end };
  }

  const orders = await Order.find(filter)
    .populate("user", "name email phone")
    .populate("products.product", "name price") // ✅ CORRECT PATH
    .sort({ createdAt: -1 });

  res.json(orders);
};