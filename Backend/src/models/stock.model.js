import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
            required: true,
        },
        items: [
            {
                device: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Device",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Stock = mongoose.model("Stock", stockSchema);
