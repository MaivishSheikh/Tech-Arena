// import { asyncHandler } from "../utils/asyncHandler.js";
// import { Stock } from "../models/stock.model.js";
// import { Device } from "../models/device.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const getStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
    
//     if (!sellerId) {
//         throw new ApiError(401, "Seller not authenticated");
//     }

//     const stock = await Stock.findOne({ seller: sellerId })
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     if (!stock) {
//         return res.status(200).json(
//             new ApiResponse(200, { items: [] }, "Stock is empty")
//         );
//     }

//     return res.status(200).json(
//         new ApiResponse(200, stock, "Stock fetched successfully")
//     );
// });

// const addToStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
//     const { deviceId, quantity = 1 } = req.body;

//     // Validation
//     if (!deviceId) {
//         throw new ApiError(400, "Device ID is required");
//     }
//     if (quantity < 1) {
//         throw new ApiError(400, "Quantity must be at least 1");
//     }

//     // Check device exists
//     const device = await Device.findById(deviceId);
//     if (!device) {
//         throw new ApiError(404, "Device not found");
//     }

//     // Find or create stock
//     let stock = await Stock.findOne({ seller: sellerId });
//     if (!stock) {
//         stock = await Stock.create({
//             seller: sellerId,
//             items: [{ device: deviceId, quantity }],
//         });
//     } else {
//         // Check if device already exists in stock
//         const existingItemIndex = stock.items.findIndex(
//             item => item.device.toString() === deviceId
//         );
        
//         if (existingItemIndex !== -1) {
//             throw new ApiError(
//                 400,
//                 "Device already in stock. Use updateStock to change quantity."
//             );
//         }
        
//         stock.items.push({ device: deviceId, quantity });
//         await stock.save();
//     }

//     // Populate before sending response
//     const populatedStock = await Stock.findById(stock._id)
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     return res.status(201).json(
//         new ApiResponse(201, populatedStock, "Device added to stock successfully")
//     );
// });

// const updateStockItem = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
//     const { deviceId } = req.params;
//     const { quantity } = req.body;

//     // Validation
//     if (!deviceId) {
//         throw new ApiError(400, "Device ID is required");
//     }
//     if (!quantity || quantity < 1) {
//         throw new ApiError(400, "Valid quantity is required (minimum 1)");
//     }

//     // Find stock
//     const stock = await Stock.findOne({ seller: sellerId });
//     if (!stock) {
//         throw new ApiError(404, "Stock not found");
//     }

//     // Find and update item
//     const itemToUpdate = stock.items.find(
//         item => item.device.toString() === deviceId
//     );
//     if (!itemToUpdate) {
//         throw new ApiError(404, "Device not found in stock");
//     }

//     itemToUpdate.quantity = quantity;
//     await stock.save();

//     // Populate before sending response
//     const populatedStock = await Stock.findById(stock._id)
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     return res.status(200).json(
//         new ApiResponse(200, populatedStock, "Stock item quantity updated successfully")
//     );
// });

// const removeFromStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
//     const { deviceId } = req.params;

//     if (!deviceId) {
//         throw new ApiError(400, "Device ID is required");
//     }

//     const stock = await Stock.findOne({ seller: sellerId });
//     if (!stock) {
//         throw new ApiError(404, "Stock not found");
//     }

//     // Filter out the item to remove
//     const initialLength = stock.items.length;
//     stock.items = stock.items.filter(
//         item => item.device.toString() !== deviceId
//     );

//     if (stock.items.length === initialLength) {
//         throw new ApiError(404, "Device not found in stock");
//     }

//     await stock.save();

//     // Populate remaining items before sending response
//     const populatedStock = await Stock.findById(stock._id)
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     return res.status(200).json(
//         new ApiResponse(200, populatedStock, "Device removed from stock")
//     );
// });

// const clearStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;

//     const result = await Stock.findOneAndDelete({ seller: sellerId });
//     if (!result) {
//         throw new ApiError(404, "Stock not found");
//     }

//     return res.status(200).json(
//         new ApiResponse(200, {}, "Stock cleared successfully")
//     );
// });

// export {
//     getStock,
//     addToStock,
//     updateStockItem,
//     removeFromStock,
//     clearStock
// };

import { asyncHandler } from "../utils/asyncHandler.js";
import { Stock } from "../models/stock.model.js";
import { Device } from "../models/device.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// const getStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
//     const userId = req.user?._id;
    
//     if (!sellerId && !userId) {
//         throw new ApiError(401, "User not authenticated");
//     }

//     console.log("Seller ID: ", sellerId)
//     console.log("User ID: ", userId)

//     // For regular users, get their own stock
//     if (userId) {
//         const allStocks = await Stock.find({})
//             .populate({
//                 path: "items.device",
//                 select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//             })
//             .populate({
//                 path: "seller",
//                 select: "companyName email"
//             })
//             .lean();

//         // Combine all items from all stocks
//         const allItems = allStocks.flatMap(stock => 
//             stock.items.map(item => ({
//                 ...item,
//                 sellerInfo: stock.seller // Include seller info with each item
//             }))
//         );

//         return res.status(200).json(
//             new ApiResponse(200, { items: allItems }, "All stock items fetched successfully")
//         );
//     }

//     // For sellers, get their own stock
//     const sellerStock = await Stock.findOne({ seller: sellerId })
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     if (!sellerStock) {
//         return res.status(200).json(
//             new ApiResponse(200, { items: [] }, "Stock is empty")
//         );
//     }

//     return res.status(200).json(
//         new ApiResponse(200, sellerStock, "Seller stock fetched successfully")
//     );
// });

// const getStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
//     const userId = req.user?._id;
    
//     if (!sellerId && !userId) {
//         throw new ApiError(401, "User not authenticated");
//     }

//     // For regular users - get all stock items with seller info
//     if (userId) {
//         const allStocks = await Stock.find({})
//             .populate({
//                 path: "seller",
//                 select: "companyName email phoneNumber" // Include seller details you want
//             })
//             .populate({
//                 path: "items.device",
//                 select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//             })
//             .lean();

//         // Transform data to include seller info with each item
//         const itemsWithSellers = allStocks.flatMap(stock => {
//             return stock.items.map(item => ({
//                 ...item,
//                 seller: {
//                     _id: stock.seller?._id,
//                     companyName: stock.seller?.companyName,
//                     email: stock.seller?.email,
//                     phoneNumber: stock.seller?.phoneNumber
//                     // Add other seller fields you need
//                 }
//             }));
//         });

//         return res.status(200).json(
//             new ApiResponse(200, { items: itemsWithSellers }, "All stock items fetched successfully")
//         );
//     }

//     // For sellers - get only their own stock (original behavior)
//     const sellerStock = await Stock.findOne({ seller: sellerId })
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     if (!sellerStock) {
//         return res.status(200).json(
//             new ApiResponse(200, { items: [] }, "Stock is empty")
//         );
//     }

//     return res.status(200).json(
//         new ApiResponse(200, sellerStock, "Seller stock fetched successfully")
//     );
// });

const getStock = asyncHandler(async (req, res) => {
    const sellerId = req.seller?._id;
    const userId = req.user?._id;
    
    if (!sellerId && !userId) {
        throw new ApiError(401, "User not authenticated");
    }

    console.log(sellerId)
    console.log(userId)

    // For regular users - get all stock items with complete seller info
    if (userId) {
        const allStocks = await Stock.find({})
            .populate({
                path: "seller",
                select: "companyName email phoneNumber address" // Include all seller fields you need
            })
            .populate({
                path: "items.device",
                select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage condition",
            })
            .lean();

        // Transform the data to include seller info with each item
        const itemsWithSellers = allStocks.flatMap(stock => {
            if (!stock.seller) return []; // Skip if no seller populated
            
            return stock.items.map(item => ({
                ...item,
                sellerInfo: {
                    companyName: stock.seller.companyName,
                    email: stock.seller.email,
                    phoneNumber: stock.seller.phoneNumber,
                    address: stock.seller.address
                    // Add any other seller fields you need
                }
            }));
        });

        return res.status(200).json(
            new ApiResponse(200, { items: itemsWithSellers }, "All stock items with seller info fetched successfully")
        );
    }

    // For sellers - get their own stock with populated device info
    const sellerStock = await Stock.findOne({ seller: sellerId })
        .populate({
            path: "items.device",
            select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage condition",
        })
        .lean();

    if (!sellerStock) {
        return res.status(200).json(
            new ApiResponse(200, { items: [] }, "Your stock is currently empty")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, sellerStock, "Your stock fetched successfully")
    );
});

// const addToStock = asyncHandler(async (req, res) => {
//     const sellerId = req.seller?._id;
//     if (!sellerId) {
//         throw new ApiError(401, "Not authenticated");
//     }

//     const { deviceId, quantity = 1 } = req.body;

//     // Validation
//     if (!deviceId) {
//         throw new ApiError(400, "Device ID is required");
//     }
//     if (quantity < 1) {
//         throw new ApiError(400, "Quantity must be at least 1");
//     }

//     // Check device exists
//     const device = await Device.findById(deviceId);
//     if (!device) {
//         throw new ApiError(404, "Device not found");
//     }

//     // Find or create stock
//     let stock = await Stock.findOne({ seller: sellerId });
//     if (!stock) {
//         stock = await Stock.create({
//             items: [{ device: deviceId, quantity }],
//         });
//     } else {
//         // Check if device already exists in stock
//         const existingItemIndex = stock.items.findIndex(
//             item => item.device.toString() === deviceId
//         );
        
//         if (existingItemIndex !== -1) {
//             throw new ApiError(
//                 400,
//                 "Device already in stock. Use updateStock to change quantity."
//             );
//         }
        
//         stock.items.push({ device: deviceId, quantity });
//         await stock.save();
//     }

//     // Populate before sending response
//     const populatedStock = await Stock.findById(stock._id)
//         .populate({
//             path: "items.device",
//             select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
//         })
//         .lean();

//     return res.status(201).json(
//         new ApiResponse(201, populatedStock, "Device added to stock successfully")
//     );
// });

const addToStock = asyncHandler(async (req, res) => {
    const sellerId = req.seller?._id;
    if (!sellerId) {
        throw new ApiError(401, "Not authenticated");
    }

    const { deviceId, quantity = 1 } = req.body;

    // Validation
    if (!deviceId) {
        throw new ApiError(400, "Device ID is required");
    }
    if (quantity < 1) {
        throw new ApiError(400, "Quantity must be at least 1");
    }

    // Check device exists and belongs to seller
    const device = await Device.findOne({
        _id: deviceId,
    });
    
    if (!device) {
        throw new ApiError(404, "Device not found or not owned by you");
    }

    // Find or create stock
    let stock = await Stock.findOne({ seller: sellerId });
    if (!stock) {
        stock = await Stock.create({
            seller: sellerId, // Add this required field
            items: [{ device: deviceId, quantity }],
        });
    } else {
        // Check if device already exists in stock
        const existingItem = stock.items.find(
            item => item.device.toString() === deviceId
        );
        
        if (existingItem) {
            existingItem.quantity += quantity; // Increment quantity if exists
        } else {
            stock.items.push({ device: deviceId, quantity });
        }
        await stock.save();
    }

    // Populate before sending response
    const populatedStock = await Stock.findById(stock._id)
        .populate({
            path: "items.device",
            select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
        })
        .lean();

    return res.status(201).json(
        new ApiResponse(201, populatedStock, "Device added to stock successfully")
    );
});

const updateStockItem = asyncHandler(async (req, res) => {
    const sellerId = req.seller?._id;

    if (!sellerId) {
        throw new ApiError(401, "Not authenticated");
    }

    const { deviceId } = req.params;
    const { quantity } = req.body;

    // Validation
    if (!deviceId) {
        throw new ApiError(400, "Device ID is required");
    }
    if (!quantity || quantity < 1) {
        throw new ApiError(400, "Valid quantity is required (minimum 1)");
    }

    // Find stock
    const stock = await Stock.findOne({seller: sellerId});
    if (!stock) {
        throw new ApiError(404, "Stock not found");
    }

    // Find and update item
    const itemToUpdate = stock.items.find(
        item => item.device.toString() === deviceId
    );
    if (!itemToUpdate) {
        throw new ApiError(404, "Device not found in stock");
    }

    itemToUpdate.quantity = quantity;
    await stock.save();

    // Populate before sending response
    const populatedStock = await Stock.findById(stock._id)
        .populate({
            path: "items.device",
            select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
        })
        .lean();

    return res.status(200).json(
        new ApiResponse(200, populatedStock, "Stock item quantity updated successfully")
    );
});

const removeFromStock = asyncHandler(async (req, res) => {
    const sellerId = req.seller?._id;

    if (!sellerId) {
        throw new ApiError(401, "Not authenticated");
    }

    const { deviceId } = req.params;

    if (!deviceId) {
        throw new ApiError(400, "Device ID is required");
    }

    // Find stock
    const stock = await Stock.findOne({ seller: sellerId });
    if (!stock) {
        throw new ApiError(404, "Stock not found");
    }

    // Filter out the item to remove
    const initialLength = stock.items.length;
    stock.items = stock.items.filter(
        item => item.device.toString() !== deviceId
    );

    if (stock.items.length === initialLength) {
        throw new ApiError(404, "Device not found in stock");
    }

    await stock.save();

    // Populate remaining items before sending response
    const populatedStock = await Stock.findById(stock._id)
        .populate({
            path: "items.device",
            select: "deviceID category generalInfo.price generalInfo.brandModel deviceImage",
        })
        .lean();

    return res.status(200).json(
        new ApiResponse(200, populatedStock, "Device removed from stock")
    );
});

const clearStock = asyncHandler(async (req, res) => {
    const sellerId = req.seller?._id;

    if (!sellerId) {
        throw new ApiError(401, "Not authenticated");
    }

    const result = await Stock.findOneAndDelete({ seller: sellerId });
    if (!result) {
        throw new ApiError(404, "Stock not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Stock cleared successfully")
    );
});

export {
    getStock,
    addToStock,
    updateStockItem,
    removeFromStock,
    clearStock
};