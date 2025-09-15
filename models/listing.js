import mongoose from "mongoose";
import { Schema } from "mongoose";

const listingVisitorSchema = new Schema({
    ipAddress: {
        type: String,
        required: true,
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    visitDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const ListingVisitor = mongoose.models.ListingVisitor || mongoose.model("ListingVisitor", listingVisitorSchema);
export default ListingVisitor;