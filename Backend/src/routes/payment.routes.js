import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  refundPayment,
} from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Secure all payment routes
router.use(verifyJWT);

router.route("/create-order").post(createPaymentOrder);
router.route("/verify").post(verifyPayment);
router.route("/history").get(getPaymentHistory);
router.route("/refund/:paymentId").post(refundPayment);

export default router;