import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// routes

import UserRoute from "./routes/signup.route.js";
import SigninRoute from "./routes/signin.route.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("hello this is working");
});
app.use(express.json());
// Routes
app.use("/kasuwa/user", UserRoute);
app.use("/kasuwa/signin", SigninRoute);


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
