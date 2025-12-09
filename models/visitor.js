import mongoose from "mongoose";
import { Schema } from "mongoose";

const visitorSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      unique: true,
    },
    pagesVisited: {
      type: [String],
      default: [],
    },
    visitDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);
export default Visitor;
