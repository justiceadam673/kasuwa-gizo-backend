import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  whatsappNumber: {
    type: Number,
  },
});

const BusinessSocial = mongoose.model("BusinessSocial", schema);
export default BusinessSocial;
