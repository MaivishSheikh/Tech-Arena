import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        brandImage: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Brand = mongoose.model("Brand", brandSchema);
