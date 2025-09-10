import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
    
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", schema);