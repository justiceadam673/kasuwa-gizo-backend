import { Router } from "express";
import Visitor from "../models/visitor.js";

const router = Router();

// CREATE Visitor
router.post("/", async (req, res, next) => {
  try {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.status(201).json({ success: true, visitor });
  } catch (err) {
    next(err);
  }
});

// READ ALL Visitors
router.get("/", async (req, res, next) => {
  try {
    const visitors = await Visitor.find();
    res.json({ success: true, visitors });
  } catch (err) {
    next(err);
  }
});
// READ SINGLE Visitor
router.get("/:id", async (req, res, next) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) return res.status(404).json({ success: false, message: "Visitor not found" });
        res.json({ success: true, visitor });
    } catch (err) {
        next(err);
    }
});
// UPDATE Visitor
router.put("/:id", async (req, res, next) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visitor) return res.status(404).json({ success: false, message: "Visitor not found" });
    res.json({ success: true, visitor });
  } catch (err) {
    next(err);
  }
});

// DELETE Visitor
router.delete("/:id", async (req, res, next) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ success: false, message: "Visitor not found" });
    res.json({ success: true, message: "Visitor deleted" });
  } catch (err) {
    next(err);
  }
});
export default router;
