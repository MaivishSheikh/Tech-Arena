import Razorpay from "razorpay";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// In your payment controller
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const amountInPaise = Math.round(amount * 100);

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      data: {
        ...order,
        key: process.env.RAZORPAY_KEY_ID // Send publishable key to frontend
      }
    });
  } catch (error) {
    throw new ApiError(500, "Failed to create payment order");
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  // Verify signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  // Update payment status
  const updatedPayment = await Payment.findOneAndUpdate(
    { orderId: razorpay_order_id },
    {
      paymentId: razorpay_payment_id,
      status: "paid",
      razorpaySignature: razorpay_signature
    },
    { new: true }
  );

  if (!updatedPayment) {
    throw new ApiError(404, "Payment record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedPayment, "Payment verified successfully")
  );
});

const getPaymentHistory = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ user: req.user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, payments, "Payment history retrieved"));
});

const refundPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const payment = await Payment.findOne({ paymentId });

  if (!payment || payment.status !== "paid") {
    throw new ApiError(400, "Payment not eligible for refund");
  }

  const refund = await razorpay.payments.refund(paymentId, {
    amount: payment.amount,
  });

  await Payment.findOneAndUpdate(
    { paymentId },
    {
      refundId: refund.id,
      refundStatus: "processed",
      status: "refunded",
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, refund, "Refund processed"));
});

export {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  refundPayment,
};