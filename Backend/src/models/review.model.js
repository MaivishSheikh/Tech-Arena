import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Review = mongoose.model("Review", reviewSchema);
