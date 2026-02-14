import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", addCategory);
router.get("/get/all", getCategories);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;