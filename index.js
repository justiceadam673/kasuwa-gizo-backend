import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// routes
import UserRoute from "./routes/signup.route.js";
import SigninRoute from "./routes/signin.route.js";
import productRoute from "./routes/product.route.js";
import categoryRoute from "./routes/category.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import SocialMedia from "./models/socialMedia.js";
import VendorProfile from "./models/vendorProfile.js";
import Company from "./models/company.js";
import Visitor from "./models/visitor.js";
import ListingVisitor from "./models/listing.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:7890",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Routes
app.use("/kasuwa/user", UserRoute);
app.use("/kasuwa/signin", SigninRoute);
app.use("/kasuwa/product", productRoute);
app.use("/kasuwa/category", categoryRoute);
app.use("/kasuwa/order", orderRoute);
app.use("/kasuwa/review", reviewRoute);
app.use("/kasuwa/socialmedia", SocialMedia);
app.use("/kasuwa/vendorprofile", VendorProfile);
app.use("/kasuwa/company", Company);
app.use("/kasuwa/visitor", Visitor);
app.use("/kasuwa/listing", ListingVisitor);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ success: false, status, message });
});

// Connect and start server
const PORT = process.env.PORT || 7890;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
