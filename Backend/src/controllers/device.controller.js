import { asyncHandler } from "../utils/asyncHandler.js";
import { Device } from "../models/device.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const deviceList = asyncHandler(async (req, res) => {
    const {
        category,
        subCategory,
        deviceName,
        generalInfo: {
            brandModel,
            launchDate,
            price,
        },
        buildDesign: {
            dimensions,
            weight,
            colorAvailable,
            otherFeatures
        },
        display: {
            size,
            type,
            resolution
        },
        performance: {
            processor,
            gpu,
            os,
            memory,
            storage
        },
        cameraSystem: {
            rearCamera: {
                noofCameraMP,
                features
            },
            frontCamera: {
                megaPixels,
                videoRecording
            }
        },
        batteryCharging: {
            batteryCapacity,
            chargingSpeed,
            batteryType,
            usbType,
            chargingFeatures
        },
        connectivity: {
            generation,
            wifiVersion,
            bluetoothVersion,
            sim
        },
        audioMultimedia: {
            speakers,
            headphoneJack,
            audioSupport,
            mic
        },
        securitySensors: {
            fingerprint,
            faceUnlock,
            otherSensors
        },
        additionalFeatures
    } = req.body;

    if (
        [
            category,
            subCategory,
            deviceName,
            brandModel,
            launchDate,
            price,
            dimensions,
            weight,
            size,
            processor,
            gpu,
            os,
            memory,
            storage,
            batteryCapacity,
            chargingSpeed,
            batteryType,
        ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All required fields are required");
    }

    const existedDevice = await Device.findOne({
        $or: [{ deviceName }],
    });

    if (existedDevice) {
        throw new ApiError(409, "This Device already exists");
    }

    const deviceImageLocalPath = req.files?.deviceImage[0]?.path;

    let alternateImageLocalPath;
    if (
        req.files &&
        Array.isArray(req.files.alternateImage) &&
        req.files.alternateImage.length > 0
    ) {
        alternateImageLocalPath = req.files.alternateImage[0].path;
    }

    if (!deviceImageLocalPath) {
        throw new ApiError(400, "Device image file is required");
    }

    const deviceImage = await uploadOnCloudinary(deviceImageLocalPath);
    const alternateImage = await uploadOnCloudinary(alternateImageLocalPath);

    if (!deviceImage) {
        throw new ApiError(400, "Device image file is required");
    }

    const device = await Device.create({
        category,
        subCategory,
        deviceImage: deviceImage.url,
        alternateImage: alternateImage?.url || "", 
        generalInfo: {
            brandModel,
            launchDate,
            price,
        },
        buildDesign: {
            dimensions,
            weight,
            colorAvailable,
            otherFeatures,
        },
        display: {
            size,
            type,
            resolution,
        },
        performance: {
            processor,
            gpu,
            os,
            memory,
            storage
        },
        cameraSystem: {
            rearCamera: {
                noofCameraMP,
                videoRecording,
                features,
            },
            frontCamera: {
                megaPixels,
                videoRecording,
            },
        },
        batteryCharging: {
            batteryCapacity,
            chargingSpeed,
            batteryType,
            usbType,
            chargingFeatures,
        },
        connectivity: {
            generation,
            wifiVersion,
            bluetoothVersion,
            sim,
        },
        audioMultimedia: {
            speakers,
            headphoneJack,
            audioSupport,
            mic,
        },
        securitySensors: {
            fingerprint,
            faceUnlock,
            otherSensors,
        },
        additionalFeatures,
    });
    

    const listedDevice = await Device.findById(device._id);

    if (!listedDevice) {
        throw new ApiError(
            500,
            "Something went wrong while listing the device"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, listedDevice, "Device Added Successfully !!!")
        );
});

const getDevice = asyncHandler(async (req, res) => {
    const devices = await Device.find();
    if (!devices || devices.length === 0) {
        throw new ApiError(404, "No devices found");
    }

    res.status(200).json(
        new ApiResponse(200, devices, "Devices fetched successfully")
    );
});

export { deviceList, getDevice }