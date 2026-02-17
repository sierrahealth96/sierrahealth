import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  uploadImage,
  deleteImage,
  upload,
  getProductsByCategory,
  getTopSellingProducts
} from "../controllers/productController.js";

const router = express.Router();

// products
router.post("/add", addProduct);
router.get("/get/all", getProducts);
router.get("/get/details/:id", getProductById);
router.get("/get/by-category/:categoryId", getProductsByCategory);
router.get("/get/top-selling", getTopSellingProducts);

// image apis
router.post("/upload-image", upload.single("image"), uploadImage);
router.delete("/delete-image", deleteImage);

export default router;