// --- controllers/auth.controller.js ---
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { fullName }],
    });
    if (existingUser) {
      return next(
        createError(400, "User with that email or full name already exists")
      );
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { identifier, password } = req.body; // email OR fullName

    // Find user by email OR fullName
    const user = await User.findOne({
      $or: [{ email: identifier }, { fullName: identifier }],
    });

    if (!user) return next(createError(404, "User not found"));

    // Check password
    const isCorrect = bcrypt.compareSync(password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong password"));

    // Generate JWT (requires JWT_SECRET in your .env)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Hide sensitive fields
    const { password: pwd, ...info } = user._doc;

    // Send response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ ...info, token });
  } catch (err) {
    next(err);
  }
};
