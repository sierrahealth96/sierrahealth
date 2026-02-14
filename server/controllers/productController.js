import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => f.path) : [];

    const product = await Product.create({
      ...req.body,
      images
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

export const getProducts = async (req, res) => {
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
};