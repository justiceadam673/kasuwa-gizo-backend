import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from ("../models/product.js");


const storage = multer.memoryStorage();
const upload = multer({ storage });

//  Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Route for uploading product
app.post("/products", upload.single("image"), async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "ecommerce" }, 
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        // Save to MongoDB
        const product = new Product({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          imageUrl: result.secure_url,  // only save URL
        });

        await product.save();
        res.json(product);
      }
    );

    // Pipe file buffer into Cloudinary
    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
