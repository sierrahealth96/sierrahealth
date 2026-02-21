import express from "express";
import { 
  submitReview, 
  getProductReviews, 
  getPendingReviews, 
  getProductAllReviews, 
  updateReviewStatus 
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/submit", submitReview);
router.get("/product/:productId", getProductReviews);
router.get("/admin/pending", getPendingReviews);
router.get("/admin/product/:productId", getProductAllReviews);
router.patch("/admin/:reviewId/status", updateReviewStatus);

export default router;
