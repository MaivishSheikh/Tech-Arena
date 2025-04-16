import mongoose, { Schema } from "mongoose";

const productRequestSchema = new Schema(
    {
        manufacturerName: { type: String, required: true },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export const ProductRequest = mongoose.model(
    "ProductRequest",
    productRequestSchema
);
