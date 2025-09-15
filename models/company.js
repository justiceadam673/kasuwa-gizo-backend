import mongoose from "mongoose";
import { Schema } from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
    },
}, { timestamps: true });
const Company = mongoose.models.Company || mongoose.model("Company", companySchema);
export default Company;