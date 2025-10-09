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
import businessInfoRoute from "./routes/businessInfo.route.js";
import businessSocialRoute from "./routes/businessSocial.route.js";
import paystackRoute from "./routes/paystack.route.js";
import auth from "./routes/auth.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "https://gizo-project.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);

// Routes
// app.use("/kasuwa/user", UserRoute);
// app.use("/kasuwa/signin", SigninRoute);
app.use("/kasuwa/auth", auth);
app.use("/kasuwa/product", productRoute);
app.use("/kasuwa/category", categoryRoute);
app.use("/kasuwa/order", orderRoute);
app.use("/kasuwa/review", reviewRoute);
app.use("/kasuwa/socialmedia", SocialMedia);
app.use("/kasuwa/vendorprofile", VendorProfile);
app.use("/kasuwa/company", Company);
app.use("/kasuwa/visitor", Visitor);
app.use("/kasuwa/listing", ListingVisitor);
app.use("/kasuwa/businessinfo", businessInfoRoute);
app.use("/kasuwa/businesssocial", businessSocialRoute);
app.use("/kasuwa/pay", paystackRoute);

// // Basic route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ success: false, status, message });
});

// Connect and start server
const PORT = process.env.PORT || 3000;
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
