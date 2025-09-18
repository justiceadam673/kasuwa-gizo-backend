import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
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
  phoneNumber: {
    type: Number,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  slug: { type: String, required: true, unique: true },
});

const User = mongoose.models.User || mongoose.model("User", schema);
export default User;
