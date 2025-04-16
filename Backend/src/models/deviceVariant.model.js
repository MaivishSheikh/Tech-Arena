import mongoose from "mongoose";

const deviceVariantSchema = new mongoose.Schema(
    {
        deviceName: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        memory: {
            type: String,
            required: true,
        },
        storage: {
            type: String,
            required: true,
        },
        colorAvailable: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const DeviceVariant = mongoose.model(
    "DeviceVariant",
    deviceVariantSchema
);