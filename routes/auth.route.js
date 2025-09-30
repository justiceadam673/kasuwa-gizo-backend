import { Router } from "express";
import User from "../models/userSchema.js";
import slugify from "slugify";
import mongoose from "mongoose";

const route = Router();

/* -------------------------------
   AUTH ROUTES
--------------------------------*/

// SIGNUP
route.post("/signup", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Generate base slug from full name
    let baseSlug = slugify(fullName, { lower: true, strict: true });

    // Ensure slug uniqueness
    let slug = baseSlug;
    let count = 1;
    while (await User.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const user = new User({
      fullName,
      email,
      password, // ❗TODO: hash password in production
      slug,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Signup successful!",
      user,
      profileUrl: `/u/${slug}`, // unique profile URL
    });
  } catch (err) {
    next(err);
  }
});

// SIGNIN
route.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, message: "Signin successful", user });
  } catch (err) {
    next(err);
  }
});

/* -------------------------------
   USER ROUTES
--------------------------------*/

// READ ALL USERS
route.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
});

// GET USER BY SLUG
route.get("/u/:slug", async (req, res, next) => {
  try {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// GET USER BY ID (validate ObjectId first)
route.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// UPDATE USER
route.put("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// DELETE USER
route.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
});

export default route;
