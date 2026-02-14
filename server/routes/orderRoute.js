import express from "express";
import { createOrder, getOrdersByDate } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

// date filter
router.get("/", getOrdersByDate);

export default router;