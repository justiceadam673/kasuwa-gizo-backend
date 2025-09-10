import mongoose from "mongoose";
import { Schema } from "mongoose";


const reviewSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;

