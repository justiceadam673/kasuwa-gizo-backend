import { Router } from "express";
import { signin, signup } from "../controllers/user.controller.js";
import User from "../models/userSchema.js"

const route = Router();


// route.get("/signin", signin);
// // route.post("/signup", signup);
// route.post("/", (req, res) => {
//   // your signup logic here
//   res.json({ message: "Signup successful!" });
// });


// CREATE (Signup)
route.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// READ ALL USERS
route.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE USER
route.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// UPDATE USER
route.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// DELETE USER
route.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
});



export default route;
