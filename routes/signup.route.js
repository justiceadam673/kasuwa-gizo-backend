import { Router } from "express";
import User from "../models/userSchema.js";
import slugify from "slugify";

const route = Router();

// CREATE (Signup)
route.post("/", async (req, res, next) => {
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
      password, // ❗ TODO: hash password before saving in production
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

// READ ALL USERS
route.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE USER (by MongoDB ID)
route.get("/:id", async (req, res, next) => {
  try {
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
