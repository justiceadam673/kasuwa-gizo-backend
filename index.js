dotenv.config();
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// routes

import UserRoute from "./routes/signup.route.js";
import SigninRoute from "./routes/signin.route.js";
import productRoute from ("./routes/product.route.js");
import categoryRoute from ("./routes/category.route.js");
import orderRoute from ("./routes/order.route.js");
import reviewRoute from ("./routes/review.route.js");
import multer from "multer";
import path from "path";



const app = express();

app.get("/", (req, res) => {
  res.send("hello this is working");
});
app.use(express.json());
// API Routes
app.use("/kasuwa/user", UserRoute);
app.use("/kasuwa/signin", SigninRoute);
app.use("/kasuwa/product", productRoute);
app.use("/kasuwa/category", categoryRoute);
app.use("/kasuwa/order", orderRoute);
app.use("/kasuwa/review", reviewRoute);



// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ success: false, status, message });
});

// Connect and start server
const PORT = process.env.PORT || 7890;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
