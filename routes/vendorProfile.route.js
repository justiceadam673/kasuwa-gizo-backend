import {Router} from "express";
import VendorProfile from "../models/vendorProfile.js";
import { paginateAndSearch } from "../utils/pagination";

const router = Router();

// CREATE VendorProfile
router.post("/", async (req, res, next) => {
  try {
    const vendorProfile = new VendorProfile(req.body);
    await vendorProfile.save();
    res.status(201).json({success: true, vendorProfile});
  } catch (err) {
    next(err);
  }
});

// READ ALL VendorProfiles
router.get("/", async (req, res, next) => {
  try {
    const vendorProfiles = await VendorProfile.find();
    res.json({success: true, vendorProfiles});
  } catch (err) {
    next(err);
  }
});
// READ SINGLE VendorProfile
router.get("/:id", async (req, res, next) => {
  try {
    const vendorProfile = await VendorProfile.findById(req.params.id);
    if (!vendorProfile) return res.status(404).json({success: false, message: "Vendor Profile not found"});
    res.json({success: true, vendorProfile});
  } catch (err) {
    next(err);
  }
});

// UPDATE VendorProfile
router.put("/:id", async (req, res, next) => {
  try {
    const vendorProfile = await VendorProfile.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!vendorProfile) return res.status(404).json({success: false, message: "Vendor Profile not found"});
    res.json({success: true, vendorProfile});
  } catch (err) {
    next(err);
  }
});

// DELETE VendorProfile
router.delete("/:id", async (req, res, next) => {
  try {
    const vendorProfile = await VendorProfile.findByIdAndDelete(req.params.id);
    if (!vendorProfile) return res.status(404).json({success: false, message: "Vendor Profile not found"});
    res.json({success: true, message: "Vendor Profile deleted"});
  } catch (err) {
    next(err);
  }
});

export default router;