import crypto from "crypto";

export default function verifyPaystackWebhook(req, res, next) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  const signature = req.headers["x-paystack-signature"];

  if (signature !== hash) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid signature" });
  }

  next();
}
