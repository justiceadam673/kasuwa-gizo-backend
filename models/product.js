import mongoose from "mongoose";
import { Schema } from "mongoose";


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    brand: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: [true, "Please add stock count"],
      default: 0,
    },
    image: {
      type: String, // Cloudinary / local path / GridFS URL
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: { type: String, required: true },
        rating: { type: Number, default: 0 },
        comment: { type: String},
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
