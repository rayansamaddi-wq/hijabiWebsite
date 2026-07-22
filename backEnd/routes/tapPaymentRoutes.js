import express from "express";
import {
  createTapCharge,
  getTapCharge,
  tapWebhook,
} from "../controllers/tapPaymentController.js";
import {verifyTapWebhook} from "../middleware/verifyTapWebhook.js";

const router = express.Router();

// Create payment session
router.post("/create-charge", createTapCharge);

// Get payment status
router.get("/charge/:chargeId", getTapCharge);

// Webhook (Tap calls this)
router.post("/webhook",verifyTapWebhook, tapWebhook);

export default router;