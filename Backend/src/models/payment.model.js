import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paymentId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for failed payments
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "attempted", "paid", "failed", "refunded"],
      default: "created",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receipt: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "netbanking", "upi", "wallet", "emi"],
    },
    razorpaySignature: {
      type: String,
    },
    refundId: {
      type: String,
    },
    refundStatus: {
      type: String,
      enum: ["none", "pending", "processed", "failed"],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);