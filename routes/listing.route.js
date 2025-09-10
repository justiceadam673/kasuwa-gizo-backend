import { Router } from "express";
import ListingVisitor from "../models/listing.js";
import { paginateAndSearch } from "../utils/pagination";

const router = Router();

// CREATE LISTING

router.post("/", async (req, res, next) => {
    const listing = new ListingVisitor(req.body);
    try {
        await listing.save();
        res.status(201).json({ success: true, listing });
    } catch (err) {
        next(err);
    }
});

// READ ALL LISTINGS
router.get("/", async (req, res, next) => {
    try {
        const listings = await ListingVisitor.find();
        res.json({ success: true, listings });
    } catch (err) {
        next(err);
    }
});
// READ SINGLE LISTING
router.get("/:id", async (req, res, next) => {
    try {
        const listing = await ListingVisitor.findById(req.params.id);
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });
        res.json({ success: true, listing });
    } catch (err) {
        next(err);
    }
});
// UPDATE LISTING
router.put("/:id", async (req, res, next) => {
    try {
        const listing = await ListingVisitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });
        res.json({ success: true, listing });
    } catch (err) {
        next(err);
    }
});

// DELETE LISTING
router.delete("/:id", async (req, res, next) => {
    try {
        const listing = await ListingVisitor.findByIdAndDelete(req.params.id);
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });
        res.json({ success: true, message: "Listing deleted" });
    } catch (err) {
        next(err);
    }
});

