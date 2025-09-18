import { Router } from "express";
import BusinessInfo from "../models/businessInfo.js";

const router = Router();

// CREATE BusinessInfo
router.post("/", async (req, res, next) => {
  try {
    const businessInfo = new BusinessInfo(req.body);
    await businessInfo.save();
    res.status(201).json({ success: true, businessInfo });
  } catch (err) {
    next(err);
  }
});

// READ ALL BusinessInfos
router.get("/", async (req, res, next) => {
  try {
    const businessInfos = await BusinessInfo.find();
    res.json({ success: true, businessInfos });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE BusinessInfo
router.get("/:id", async (req, res, next) => {
  try {
    const businessInfo = await BusinessInfo.findById(req.params.id);
    if (!businessInfo)
      return res
        .status(404)
        .json({ success: false, message: "Business Info not found" });
    res.json({ success: true, businessInfo });
  } catch (err) {
    next(err);
  }
});

// UPDATE BusinessInfo
router.put("/:id", async (req, res, next) => {
  try {
    const businessInfo = await BusinessInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!businessInfo)
      return res
        .status(404)
        .json({ success: false, message: "Business Info not found" });
    res.json({ success: true, businessInfo });
  } catch (err) {
    next(err);
  }
});

// DELETE BusinessInfo
router.delete("/:id", async (req, res, next) => {
  try {
    const businessInfo = await BusinessInfo.findByIdAndDelete(req.params.id);
    if (!businessInfo)
      return res
        .status(404)
        .json({ success: false, message: "Business Info not found" });
    res.json({ success: true, message: "Business Info deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
