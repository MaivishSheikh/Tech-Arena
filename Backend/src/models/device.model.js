import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        deviceName: {
            type: String,
            required: true,
        },
        operatingSystem: {
            type: String,
            required: true,
        },
        deviceImage: {
            type: String,
            required: true,
        },
        alternateImage: {
            type: String,
        },
        performance: {
            type: String,
            required: true,
        },
        processor: {
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
        display: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        battery: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        frontCamera: {
            type: String,
            required: true,
        },
        rearCamera: {
            type: String,
            required: true,
        },
        additionalFeatures: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Device = mongoose.model("Device", deviceSchema);
