// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { Device } from "../models/device.model.js";
// import { DeviceVariant } from "../models/deviceVariant.model.js";

// const addDeviceVariant = asyncHandler(async (req, res) => {
//     const { deviceName, brand, memory, storage, colorAvailable, price } = req.body;

//     // Validate required fields
//     if (!deviceName || !brand || !memory || !storage || !colorAvailable || !price) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const trimmedDeviceName = deviceName.trim();
//     const trimmedBrand = brand.trim();
//     const trimmedMemory = memory.trim();
//     const trimmedStorage = storage.trim();
//     const trimmedColorAvailable = colorAvailable.trim();

//     if (
//         [
//             trimmedDeviceName,
//             trimmedBrand,
//             trimmedMemory,
//             trimmedStorage,
//             trimmedColorAvailable,
//         ].some((field) => field === "")
//     ) {
//         throw new ApiError(400, "All fields must be non-empty strings");
//     }

//     const device = await Device.findOne({
//         "generalInfo.brandModel": trimmedDeviceName,
//     });

//     if (!device) {
//         throw new ApiError(404, "Device not found");
//     }

//     // Create the device variant
//     const variant = await DeviceVariant.create({
//         deviceName: trimmedDeviceName,
//         brand: trimmedBrand,
//         memory: trimmedMemory,
//         storage: trimmedStorage,
//         colorAvailable: trimmedColorAvailable,
//         price, // Price is already a string, no need to trim
//     });

//     if (!variant) {
//         throw new ApiError(
//             500,
//             "Something went wrong while adding the variant"
//         );
//     }

//     return res
//         .status(201)
//         .json(
//             new ApiResponse(200, variant, "Device variant added successfully")
//         );
// });

// const getAllDeviceVariants = asyncHandler(async (req, res) => {
//     // Fetch all variants from the database
//     const variants = await DeviceVariant.find();

//     if (!variants || variants.length === 0) {
//         throw new ApiError(404, "No device variants found");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 variants,
//                 "All device variants fetched successfully"
//             )
//         );
// });

// const getVariantsByDeviceName = asyncHandler(async (req, res) => {
//     const { deviceName } = req.params;

//     if (!deviceName) {
//         throw new ApiError(400, "Device name is required");
//     }

//     // Check if the device exists
//     const device = await Device.findOne({
//         "generalInfo.brandModel": deviceName,
//     });

//     if (!device) {
//         throw new ApiError(404, "Device not found");
//     }

//     // Fetch all variants for the device
//     const variants = await DeviceVariant.find({ deviceName });

//     if (!variants || variants.length === 0) {
//         throw new ApiError(404, "No variants found for this device");
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, variants, "Variants fetched successfully"));
// });

// const updateDeviceVariant = asyncHandler(async (req, res) => {
//     const { variantId } = req.params;
//     const { deviceName, memory, storage, colorAvailable, price } = req.body;

//     // Validate required fields
//     if (!deviceName || !memory || !storage || !colorAvailable || !price) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const trimmedDeviceName = deviceName.trim();
//     const trimmedMemory = memory.trim();
//     const trimmedStorage = storage.trim();
//     const trimmedColorAvailable = colorAvailable.trim();

//     if (
//         [
//             trimmedDeviceName,
//             trimmedMemory,
//             trimmedStorage,
//             trimmedColorAvailable,
//         ].some((field) => field === "")
//     ) {
//         throw new ApiError(400, "All fields must be non-empty strings");
//     }

//     // Check if the device exists
//     const device = await Device.findOne({
//         "generalInfo.brandModel": trimmedDeviceName,
//     });

//     if (!device) {
//         throw new ApiError(404, "Device not found");
//     }

//     // Find and update the variant
//     const updatedVariant = await DeviceVariant.findByIdAndUpdate(
//         variantId,
//         {
//             deviceName: trimmedDeviceName,
//             memory: trimmedMemory,
//             storage: trimmedStorage,
//             colorAvailable: trimmedColorAvailable,
//             price,
//         },
//         { new: true }
//     );

//     if (!updatedVariant) {
//         throw new ApiError(404, "Variant not found or could not be updated");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 updatedVariant,
//                 "Device variant updated successfully"
//             )
//         );
// });

// const deleteDeviceVariant = asyncHandler(async (req, res) => {
//     const { variantId } = req.params;

//     if (!variantId) {
//         throw new ApiError(400, "Variant ID is required");
//     }

//     const deletedVariant = await DeviceVariant.findByIdAndDelete(variantId);

//     if (!deletedVariant) {
//         throw new ApiError(404, "Variant not found or could not be deleted");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 deletedVariant,
//                 "Device variant deleted successfully"
//             )
//         );
// });

// // Add these to your exports
// export {
//     addDeviceVariant,
//     getAllDeviceVariants,
//     getVariantsByDeviceName,
//     updateDeviceVariant,
//     deleteDeviceVariant,
// };

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Device } from "../models/device.model.js";
import { DeviceVariant } from "../models/deviceVariant.model.js";

const addDeviceVariant = asyncHandler(async (req, res) => {
    const { brand, deviceName, memory, storage, colorAvailable, price } = req.body;

    // Validate required fields
    if (!brand || !deviceName || !memory || !storage || !colorAvailable || !price) {
        throw new ApiError(400, "All fields are required");
    }

    const trimmedBrand = brand.trim();
    const trimmedDeviceName = deviceName.trim();
    const trimmedMemory = memory.trim();
    const trimmedStorage = storage.trim();
    const trimmedColorAvailable = colorAvailable.trim();

    if (
        [
            trimmedBrand,
            trimmedDeviceName,
            trimmedMemory,
            trimmedStorage,
            trimmedColorAvailable,
        ].some((field) => field === "")
    ) {
        throw new ApiError(400, "All fields must be non-empty strings");
    }

    const device = await Device.findOne({
        "generalInfo.brandModel": trimmedDeviceName,
    });

    if (!device) {
        throw new ApiError(404, "Device not found");
    }

    // Create the device variant
    const variant = await DeviceVariant.create({
        brand: trimmedBrand,
        deviceName: trimmedDeviceName,
        memory: trimmedMemory,
        storage: trimmedStorage,
        colorAvailable: trimmedColorAvailable,
        price,
    });

    if (!variant) {
        throw new ApiError(500, "Something went wrong while adding the variant");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, variant, "Device variant added successfully")
        );
});

const getAllDeviceVariants = asyncHandler(async (req, res) => {
    // Fetch all variants from the database
    const variants = await DeviceVariant.find();

    if (!variants || variants.length === 0) {
        throw new ApiError(404, "No device variants found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                variants,
                "All device variants fetched successfully"
            )
        );
});

const getVariantsByDeviceName = asyncHandler(async (req, res) => {
    const { deviceName } = req.params;

    if (!deviceName) {
        throw new ApiError(400, "Device name is required");
    }

    // Check if the device exists
    const device = await Device.findOne({
        "generalInfo.brandModel": deviceName,
    });

    if (!device) {
        throw new ApiError(404, "Device not found");
    }

    // Fetch all variants for the device
    const variants = await DeviceVariant.find({ deviceName });

    if (!variants || variants.length === 0) {
        throw new ApiError(404, "No variants found for this device");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, variants, "Variants fetched successfully"));
});

const getVariantsByBrand = asyncHandler(async (req, res) => {
    const { brand } = req.params;

    if (!brand) {
        throw new ApiError(400, "Brand name is required");
    }

    const trimmedBrand = brand.trim();

    // Fetch all variants for the brand
    const variants = await DeviceVariant.find({ brand: trimmedBrand })
        .sort({ deviceName: 1 }); // Sort by device name alphabetically

    if (!variants || variants.length === 0) {
        throw new ApiError(404, `No variants found for brand: ${trimmedBrand}`);
    }

    // Optional: Group variants by device name for better organization
    const groupedVariants = variants.reduce((acc, variant) => {
        if (!acc[variant.deviceName]) {
            acc[variant.deviceName] = [];
        }
        acc[variant.deviceName].push(variant);
        return acc;
    }, {});

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                brand: trimmedBrand,
                variants: variants, // Send the array directly
                count: variants.length
            },
            `Variants for ${trimmedBrand} fetched successfully`
        )
    );
});

const updateDeviceVariant = asyncHandler(async (req, res) => {
    const { variantId } = req.params;
    const { brand, deviceName, memory, storage, colorAvailable, price } = req.body;

    // Validate required fields
    if (!brand || !deviceName || !memory || !storage || !colorAvailable || !price) {
        throw new ApiError(400, "All fields are required");
    }

    const trimmedBrand = brand.trim();
    const trimmedDeviceName = deviceName.trim();
    const trimmedMemory = memory.trim();
    const trimmedStorage = storage.trim();
    const trimmedColorAvailable = colorAvailable.trim();

    if (
        [
            trimmedBrand,
            trimmedDeviceName,
            trimmedMemory,
            trimmedStorage,
            trimmedColorAvailable,
        ].some((field) => field === "")
    ) {
        throw new ApiError(400, "All fields must be non-empty strings");
    }

    // Check if the device exists
    const device = await Device.findOne({
        "generalInfo.brandModel": trimmedDeviceName,
    });

    if (!device) {
        throw new ApiError(404, "Device not found");
    }

    // Find and update the variant
    const updatedVariant = await DeviceVariant.findByIdAndUpdate(
        variantId,
        {
            brand: trimmedBrand,
            deviceName: trimmedDeviceName,
            memory: trimmedMemory,
            storage: trimmedStorage,
            colorAvailable: trimmedColorAvailable,
            price,
        },
        { new: true }
    );

    if (!updatedVariant) {
        throw new ApiError(404, "Variant not found or could not be updated");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedVariant,
                "Device variant updated successfully"
            )
        );
});

const deleteDeviceVariant = asyncHandler(async (req, res) => {
    const { variantId } = req.params;

    if (!variantId) {
        throw new ApiError(400, "Variant ID is required");
    }

    const deletedVariant = await DeviceVariant.findByIdAndDelete(variantId);

    if (!deletedVariant) {
        throw new ApiError(404, "Variant not found or could not be deleted");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedVariant,
                "Device variant deleted successfully"
            )
        );
});

export {
    addDeviceVariant,
    getAllDeviceVariants,
    getVariantsByDeviceName,
    getVariantsByBrand,
    updateDeviceVariant,
    deleteDeviceVariant,
};