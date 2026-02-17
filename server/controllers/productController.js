import Product from "../models/Product.js";
import Order from "../models/Order.js";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

/* ======================================================
   CLOUDINARY CONFIG (INLINE – NO .env REQUIRED)
====================================================== */
cloudinary.config({
  cloud_name: "decnkciav",
  api_key: "165278783233975",
  api_secret: "ej6BTd2oeLjEY-9N-bquAOZ_wWw"
});

/* ======================================================
   MULTER CONFIG (TEMP FILE STORAGE)
====================================================== */
const storage = multer.diskStorage({
  destination: "tempUploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });

/* ======================================================
   UPLOAD IMAGE → CLOUDINARY
====================================================== */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "medical-products",
      allowed_formats: ["jpg", "jpeg", "png", "webp"]
    });

    // delete temp file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ======================================================
   DELETE IMAGE FROM CLOUDINARY
====================================================== */
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: "public_id is required" });
    }

    await cloudinary.uploader.destroy(public_id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ======================================================
   ADD PRODUCT (FINAL SAVE)
====================================================== */
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      description,
      images
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Product name and category are required"
      });
    }

    const product = await Product.create({
      name,
      brand,
      category,
      price,
      description,
      images // array of cloudinary URLs
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({
      message: "Failed to add product",
      error: error.message
    });
  }
};

/* ======================================================
   GET PRODUCTS (PAGINATION)
====================================================== */
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();

    const products = await Product.find()
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PRODUCT DETAILS BY ID
// controllers/productController.js

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { exclude } = req.query; // productId to exclude

    const filter = {
      category: categoryId
    };

    if (exclude) {
      filter._id = { $ne: exclude };
    }

    const products = await Product.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch similar products",
      error: error.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({
      message: "Failed to fetch product details",
      error: error.message
    });
  }
};

export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },

      {
        $group: {
          _id: "$products.product",
          totalQuantity: { $sum: "$products.quantity" }
        }
      },

      { $sort: { totalQuantity: -1 } },
      { $limit: 3 },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      { $unwind: "$product" },

      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$product", { soldQuantity: "$totalQuantity" }]
          }
        }
      }
    ]);

    res.json(topProducts);
  } catch (error) {
    console.error("Top selling products error:", error);
    res.status(500).json({
      message: "Failed to fetch top selling products",
      error: error.message
    });
  }
};
