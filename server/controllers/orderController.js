import dayjs from "dayjs";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { sendOrderEmail } from "../services/emailSend.js";

export const createOrder = async (req, res) => {
  const { name, email, phone, products, message } = req.body;

  const user = await User.create({ name, email, phone });

  const order = await Order.create({
    user: user._id,
    products: products || [],
    message
  });

  // send confirmation email
  if (email) {
    await sendOrderEmail({ to: email, name, products });
  }

  res.json(order);
};



export const getOrdersByDate = async (req, res) => {
  const { date } = req.query; // YYYY-MM-DD

  let filter = {};

  if (date) {
    const start = dayjs(date).startOf("day").toDate();
    const end = dayjs(date).endOf("day").toDate();

    filter.createdAt = { $gte: start, $lte: end };
  }

  const orders = await Order.find(filter)
    .populate("user")
    .sort({ createdAt: -1 });

  res.json(orders);
};