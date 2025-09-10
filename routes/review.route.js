 import { Router } from "express";
import Review from("../models/review.js");

const router = Router();


// CREATE Review
router.post("/", async (req, res, next) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
});

// READ ALL Reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE Review
router.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
});

// UPDATE Review
router.put("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
});

// DELETE Review
router.delete("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;