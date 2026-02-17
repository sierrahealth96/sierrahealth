import express from "express";
import { createOrder, getOrdersByDate } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

// date filter
router.get("/get/orders", getOrdersByDate);

export default router;