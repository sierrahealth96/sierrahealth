import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import crmRoute from "./routes/crmRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/crm", crmRoute);

app.get("/", (_, res) => res.send("API Running"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});