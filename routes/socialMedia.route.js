import { Router } from "express";
import SocialMedia from "../models/socialMedia.js";

const router = Router();
// CREATE SocialMedia
router.post("/", async (req, res, next) => {
  try {
    const socialMedia = new SocialMedia(req.body);
    await socialMedia.save();
    res.status(201).json({ success: true, socialMedia });
  } catch (err) {
    next(err);
  }
});

// READ ALL SocialMedias
router.get("/", async (req, res, next) => {
  try {
    const socialMedias = await SocialMedia.find();
    res.json({ success: true, socialMedias });
  } catch (err) {
    next(err);
  }
});
// READ SINGLE SocialMedia
router.get("/:id", async (req, res, next) => {
  try {
    const socialMedia = await SocialMedia.findById(req.params.id);
    if (!socialMedia) return res.status(404).json({ success: false, message: "Social Media not found" });
    res.json({ success: true, socialMedia });
  } catch (err) {
    next(err);
  }
});

// UPDATE SocialMedia
router.put("/:id", async (req, res, next) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!socialMedia) return res.status(404).json({ success: false, message: "Social Media not found" });
    res.json({ success: true, socialMedia });
  } catch (err) {
    next(err);
  }
});

// DELETE SocialMedia
router.delete("/:id", async (req, res, next) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!socialMedia) return res.status(404).json({ success: false, message: "Social Media not found" });
    res.json({ success: true, message: "Social Media deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
