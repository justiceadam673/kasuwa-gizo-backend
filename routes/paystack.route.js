import { Router } from "express";
import {
  createPayment,
  confirmPayment,
  handleWebhook,
} from "../controllers/paystackController.js";
import verifyPaystackWebhook from "../middleware/verifyPaystackWebhook.js";

const router = Router();

router.post("/initialize", createPayment);
router.post("/verify", confirmPayment);
router.post("/webhook", verifyPaystackWebhook, handleWebhook);

export default router;
