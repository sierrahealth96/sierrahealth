import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },
    name: { type: String, required: true, trim: true },
    stars: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: 'Stars must be an integer between 1-5'
      }
    },
    comment: { 
      type: String, 
      required: true, 
      trim: true,
      maxlength: 1000 
    },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
