import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductRequest } from "../models/productRequest.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Submit a new product request (Seller)
const requestProduct = asyncHandler(async (req, res) => {
    const { manufacturerName, productName, description, price } = req.body;

    // Validate required fields
    if (
        [manufacturerName, productName, description, price].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // const lastRequest = await ProductRequest.findOne().sort({ _id: -1 });
    //     let newRequestID = "PR100";

    //     if (lastRequest && lastRequest.requestID) {
    //         const lastIDNumber = parseInt(lastRequest.requestID.slice(1), 10);
    //         newRequestID = `PR${lastIDNumber + 1}`;
    //     }

    // Create request
    const productRequest = await ProductRequest.create({
        // requestID: newRequestID,
        manufacturerName,
        productName,
        description,
        price: parseFloat(price),
        status: "pending",
    });

    if (!productRequest) {
        throw new ApiError(500, "Failed to create product request");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                productRequest,
                "Product request submitted successfully"
            )
        );
});

// Get all pending requests (Admin)
const getRequests = asyncHandler(async (req, res) => {
    const requests = await ProductRequest.find();

    if (!requests || requests.length === 0) {
        throw new ApiError(404, "No requests found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                requests,
                "Pending requests fetched successfully"
            )
        );
});

// Approve a product request (Admin)
const approveRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

    if (!requestId) {
        throw new ApiError(400, "Request ID is required");
    }

    const updatedRequest = await ProductRequest.findByIdAndUpdate(
        requestId,
        { status: "approved" },
        { new: true }
    );

    if (!updatedRequest) {
        throw new ApiError(404, "Request not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedRequest,
                "Product approved successfully"
            )
        );
});

// Reject a product request (Admin)
const rejectRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

    if (!requestId) {
        throw new ApiError(400, "Request ID is required");
    }

    const deletedRequest = await ProductRequest.findByIdAndDelete(requestId);

    if (!deletedRequest) {
        throw new ApiError(404, "Request not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedRequest,
                "Product rejected successfully"
            )
        );
});

// Get all approved products (For display)
const getApprovedProducts = asyncHandler(async (req, res) => {
    const products = await ProductRequest.find({ status: "approved" });

    if (!products || products.length === 0) {
        throw new ApiError(404, "No approved products found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                products,
                "Approved products fetched successfully"
            )
        );
});

export {
    requestProduct,
    getRequests,
    approveRequest,
    rejectRequest,
    getApprovedProducts,
};
