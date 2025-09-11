import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
  },
  businessCategory: {
    type: String,
    required: true,
  },
  businessPhone: {
    type: Number,
    required: true,
  },
  businessLocation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const BusinessInfo = mongoose.model("BusinessInfo", schema);
export default BusinessInfo;
