import mongoose from "mongoose";
import { Schema } from "mongoose";

const vendorProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    },
    shopName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
    },
    banner: {
        type: String,
    },
}, { timestamps: true });

const VendorProfile = mongoose.models.VendorProfile || mongoose.model("VendorProfile", vendorProfileSchema);
export default VendorProfile;