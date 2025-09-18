import { Router } from "express";
import BusinessSocial from "../models/businessSocials";
const router = Router();

// CREATE BusinessSocial
router.post("/", async (req, res, next) => {
  try {
    const businessSocial = new BusinessSocial(req.body);
    await businessSocial.save();
    res.status(201).json({ success: true, businessSocial });
  } catch (err) {
    next(err);
  }
});

// READ ALL BusinessSocials
router.get("/", async (req, res, next) => {
  try {
    const businessSocials = await BusinessSocial.find();
    res.json({ success: true, businessSocials });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE BusinessSocial
router.get("/:id", async (req, res, next) => {
  try {
    const businessSocial = await BusinessSocial.findById(req.params.id);
    if (!businessSocial)
      return res
        .status(404)
        .json({ success: false, message: "Business Social not found" });
    res.json({ success: true, businessSocial });
  } catch (err) {
    next(err);
  }
});

// UPDATE BusinessSocial
router.put("/:id", async (req, res, next) => {
  try {
    const businessSocial = await BusinessSocial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!businessSocial)
      return res
        .status(404)
        .json({ success: false, message: "Business Social not found" });
    res.json({ success: true, businessSocial });
  } catch (err) {
    next(err);
  }
});

// DELETE BusinessSocial
router.delete("/:id", async (req, res, next) => {
  try {
    const businessSocial = await BusinessSocial.findByIdAndDelete(
      req.params.id
    );
    if (!businessSocial)
      return res
        .status(404)
        .json({ success: false, message: "Business Social not found" });
    res.json({ success: true, message: "Business Social deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
