import { asyncHandler } from "../utils/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { Device } from "../models/device.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// const getCart = asyncHandler(async (req, res) => {
//     const userId = req.user?._id;
//     const cart = await Cart.findOne({ user: userId }).populate({
//         path: "items.device",
//         select: "deviceID category deviceImage generalInfo.price generalInfo.brandModel",
//     });
//     if (!cart) {
//         return res
//             .status(200)
//             .json(new ApiResponse(200, { items: [] }, "Cart is empty"));
//     }
//     return res
//         .status(200)
//         .json(new ApiResponse(200, cart, "Cart fetched successfully"));
// });

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    
    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    const cart = await Cart.findOne({ user: userId }).populate({
        path: "items.device",
        select: "deviceID category deviceImage generalInfo.price generalInfo.brandModel",
    }).lean(); // Convert to plain object for better performance

    if (!cart) {
        return res.status(200).json(new ApiResponse(200, { items: [] }, "Cart is empty"));
    }

    console.log("Fetched Cart:", cart); // Debugging Log

    return res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { deviceId, quantity = 1 } = req.body;
    if (!deviceId) throw new ApiError(400, "Device ID is required");
    const device = await Device.findById(deviceId);
    if (!device) throw new ApiError(404, "Device not found");
    if (quantity < 1) throw new ApiError(400, "Quantity must be at least 1");
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [{ device: deviceId, quantity }],
        });
    } else {
        const existingItem = cart.items.find(
            (item) => item.device.toString() === deviceId
        );
        if (existingItem)
            throw new ApiError(
                400,
                "Device already in cart. Use updateCart to change quantity."
            );
        cart.items.push({ device: deviceId, quantity });
    }
    await cart.save();
    await cart.populate({
        path: "items.device",
        select: "deviceID category subCategory deviceImage generalInfo.price",
    });
    return res
        .status(201)
        .json(new ApiResponse(201, cart, "Device added to cart successfully"));
});

const updateCartItem = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { deviceId } = req.params;
    const { quantity } = req.body;
    if (!deviceId) throw new ApiError(400, "Device ID is required");
    if (!quantity || quantity < 1)
        throw new ApiError(400, "Valid quantity is required (minimum 1)");
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(404, "Cart not found");
    const itemToUpdate = cart.items.find(
        (item) => item.device.toString() === deviceId
    );
    if (!itemToUpdate) throw new ApiError(404, "Device not found in cart");
    itemToUpdate.quantity = quantity;
    await cart.save();
    await cart.populate({
        path: "items.device",
        select: "deviceID category subCategory deviceImage generalInfo.price",
    });
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                cart,
                "Cart item quantity updated successfully"
            )
        );
});

const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { deviceId } = req.params;
    if (!deviceId) throw new ApiError(400, "Device ID is required");
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(404, "Cart not found");
    cart.items = cart.items.filter(
        (item) => item.device.toString() !== deviceId
    );
    await cart.save();
    await cart.populate({
        path: "items.device",
        select: "deviceID category subCategory deviceImage generalInfo.price",
    });
    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Device removed from cart"));
});

const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const result = await Cart.findOneAndDelete({ user: userId });
    if (!result) throw new ApiError(404, "Cart not found");
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Cart cleared successfully"));
});

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
