import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Device } from "../models/device.model.js";
import { DeviceVariant } from "../models/deviceVariant.model.js";

const addDeviceVariant = asyncHandler(async (req, res) => {
  const { deviceName, memory, storage, colorAvailable, price } = req.body;

  // Validate required fields
  if (
    !deviceName ||
    !memory ||
    !storage ||
    !colorAvailable ||
    !price 
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const trimmedDeviceName = deviceName.trim();
  const trimmedMemory = memory.trim();
  const trimmedStorage = storage.trim();
  const trimmedColorAvailable = colorAvailable.trim();

  if (
    [trimmedDeviceName, trimmedMemory, trimmedStorage, trimmedColorAvailable].some(
      (field) => field === ""
    )
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
    deviceName: trimmedDeviceName,
    memory: trimmedMemory,
    storage: trimmedStorage,
    colorAvailable: trimmedColorAvailable,
    price, // Price is already a string, no need to trim
  });

  if (!variant) {
    throw new ApiError(500, "Something went wrong while adding the variant");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, variant, "Device variant added successfully"));
});

const getAllDeviceVariants = asyncHandler(async (req, res) => {
    // Fetch all variants from the database
    const variants = await DeviceVariant.find();
  
    if (!variants || variants.length === 0) {
      throw new ApiError(404, "No device variants found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, variants, "All device variants fetched successfully"));
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

export { addDeviceVariant, getAllDeviceVariants, getVariantsByDeviceName };