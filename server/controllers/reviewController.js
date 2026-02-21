import Review from "../models/Review.js";
import Product from "../models/Product.js";

// Submit review (user)
export const submitReview = async (req, res) => {
  try {
    const { productId, name, stars, comment } = req.body;

    // Validation
    if (!productId || !name || !stars || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (stars < 1 || stars > 5 || !Number.isInteger(stars)) {
      return res.status(400).json({ error: "Stars must be 1-5" });
    }

    if (comment.length > 1000) {
      return res.status(400).json({ error: "Comment too long" });
    }

    // Check if review exists for this user/product (simple check by name)
    const existingReview = await Review.findOne({ 
      product: productId, 
      name: name.trim(),
      status: { $ne: 'rejected' }
    });

    if (existingReview) {
      return res.status(400).json({ error: "You already submitted a review" });
    }

    // Create review
    const review = new Review({
      product: productId,
      name: name.trim(),
      stars: parseInt(stars),
      comment: comment.trim()
    });

    await review.save();

    // Add review ID to product
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id }
    });

    res.status(201).json({ 
      message: "Review submitted successfully! Awaiting admin approval.",
      reviewId: review._id 
    });
  } catch (error) {
    console.error("Submit review error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get reviews by product ID (only accepted reviews)
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ 
      product: productId, 
      status: 'accepted' 
    })
    .sort({ createdAt: -1 })
    .lean();

    // Calculate average rating
    const averageRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
      : 0;

    res.json({
      reviews,
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error("Get product reviews error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: Get all pending reviews
export const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'pending' })
      .populate('product', 'name brand images')
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (error) {
    console.error("Get pending reviews error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: Get all reviews for a product
export const getProductAllReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (error) {
    console.error("Get all product reviews error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: Update review status
export const updateReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ 
      message: `Review ${status} successfully`,
      review 
    });
  } catch (error) {
    console.error("Update review status error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
