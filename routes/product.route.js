import { Router } from "express";
import Product from "../models/product.js";
import upload from "../middleware/upload.js";        
import cloudinary from "../config/cloudinary.js";   

const router = Router();

// CREATE Product (with Cloudinary upload)
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    let imageUrl = null;

    if (req.file) {
      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer); 
      });

      imageUrl = result.secure_url;
    }

    // Create new product with Cloudinary image URL
    const product = new Product({
      ...req.body,
      image: imageUrl, // 👈 saved in MongoDB
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

// READ ALL Products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE Product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

// UPDATE Product
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

// DELETE Product
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
