import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new msg
const addMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (
        [name, email, message].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const msg = await Message.create({
        name,
        email,
        message
    });

    res.status(201).json(
        new ApiResponse(201, msg, "Message registered successfully!")
    );
});

// Get all msgs
const getMsg = asyncHandler(async (req, res) => {
    const msgs = await Message.find()
    if (!msgs.length) {
        throw new ApiError(404, "No msgs found");
    }

    res.status(200).json(
        new ApiResponse(200, msgs, "Messages fetched successfully")
    );
});

export { addMessage, getMsg };
