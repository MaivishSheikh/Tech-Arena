import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        customerID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
        },
        pincode: {
            type: String,
            required: [true, "Pincode is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Customer = mongoose.model("Customer", customerSchema);
