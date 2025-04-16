import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Device } from "../models/device.model.js";
import { User } from "../models/user.model.js";

// Create a new review
const createReview = asyncHandler(async (req, res) => {
    const { deviceId, message } = req.body;
    const userId = req.user?._id;

    // Validate required fields
    if (!deviceId) {
        throw new ApiError(400, "Device ID is required");
    }
    if (!message || message.trim() === "") {
        throw new ApiError(400, "Review message cannot be empty");
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if device exists
    const device = await Device.findById(deviceId);
    if (!device) {
        throw new ApiError(404, "Device not found");
    }

    // Create the review
    const review = await Review.create({
        user: userId,
        device: deviceId,
        message
    });

    // Populate user and device details for the response
    const populatedReview = await Review.findById(review._id)
        .populate({
            path: "user",
            select: "username email avatar" // Include whatever user fields you want to show
        })
        .populate({
            path: "device",
            select: "deviceID category deviceImage generalInfo.brandModel" // Include relevant device fields
        });

    return res.status(201).json(
        new ApiResponse(201, populatedReview, "Review created successfully")
    );
});

// Get all reviews for a specific device
const getDeviceReviews = asyncHandler(async (req, res) => {
    const { deviceId } = req.params;

    if (!deviceId) {
        throw new ApiError(400, "Device ID is required");
    }

    // Check if device exists
    const device = await Device.findById(deviceId);
    if (!device) {
        throw new ApiError(404, "Device not found");
    }

    const reviews = await Review.find({ device: deviceId })
        .populate({
            path: "user",
            select: "username email avatar" // Include whatever user fields you want to show
        })
        .sort({ createdAt: -1 }); // Sort by newest first

    return res.status(200).json(
        new ApiResponse(200, reviews, "Device reviews fetched successfully")
    );
});

// Get all reviews by a specific user
const getUserReviews = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    const reviews = await Review.find({ user: userId })
        .populate({
            path: "device",
            select: "deviceID category deviceImage generalInfo.brandModel"
        })
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, reviews, "User reviews fetched successfully")
    );
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { message } = req.body;
    const userId = req.user?._id;

    if (!reviewId) {
        throw new ApiError(400, "Review ID is required");
    }
    if (!message || message.trim() === "") {
        throw new ApiError(400, "Review message cannot be empty");
    }

    // Find the review and verify ownership
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }
    if (review.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You can only update your own reviews");
    }

    // Update the review
    review.message = message;
    await review.save();

    // Populate the updated review for response
    const populatedReview = await Review.findById(review._id)
        .populate({
            path: "user",
            select: "username email avatar"
        })
        .populate({
            path: "device",
            select: "deviceID category deviceImage generalInfo.brandModel"
        });

    return res.status(200).json(
        new ApiResponse(200, populatedReview, "Review updated successfully")
    );
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user?._id;

    if (!reviewId) {
        throw new ApiError(400, "Review ID is required");
    }

    // Find the review and verify ownership
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }
    if (review.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You can only delete your own reviews");
    }

    await Review.findByIdAndDelete(reviewId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Review deleted successfully")
    );
});

export {
    createReview,
    getDeviceReviews,
    getUserReviews,
    updateReview,
    deleteReview
};