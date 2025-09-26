import {
  initializePayment,
  verifyPayment,
} from "../services/paystackService.js";

// POST /kasuwa/pay/initialize
export async function createPayment(req, res, next) {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Email and amount are required" });
    }

    const data = await initializePayment(email, amount);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// POST /kasuwa/pay/verify
export async function confirmPayment(req, res, next) {
  try {
    const { reference } = req.body;
    if (!reference) {
      return res
        .status(400)
        .json({ success: false, message: "Reference is required" });
    }

    const data = await verifyPayment(reference);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// POST /kasuwa/pay/webhook
export async function handleWebhook(req, res, next) {
  try {
    const event = req.body;

    if (event.event === "charge.success") {
      // ✅ You can update your Order model here (mark as paid)
      console.log("💰 Payment successful:", event.data);
    }

    res.sendStatus(200); // must respond quickly
  } catch (err) {
    next(err);
  }
}
