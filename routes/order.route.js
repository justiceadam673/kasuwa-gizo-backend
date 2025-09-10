import { Router } from "express";
import Order from "../models/order.js";

const router = Router();



// CREATE Order
router.post("/", async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

// READ ALL Orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
});

// READ SINGLE Order
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

// UPDATE Order
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

// DELETE Order
router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;