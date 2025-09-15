import mongoose from "mongoose";
import { Schema } from "mongoose";

const socialMediaSchema = new Schema({
  platform: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const SocialMedia = mongoose.models.SocialMedia || mongoose.model("SocialMedia", socialMediaSchema);
export default SocialMedia;