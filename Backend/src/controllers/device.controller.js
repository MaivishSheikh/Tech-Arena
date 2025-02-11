import { asyncHandler } from "../utils/asyncHandler.js";
import { Device } from "../models/device.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const deviceList = asyncHandler(async (req, res) => {
    const {
        category,
        subCategory,
        generalInfo: { brandModel, launchDate, price },
        buildDesign: { dimensions, weight, colorAvailable, otherFeatures },
        display: { size, type, resolution },
        performance: { cpu, gpu, os, memory, storage },
        cameraSystem: {
            rearCamera: { noofCamerasMP, features, video },
            frontCamera: { megaPixels, videoRecording },
        },
        batteryCharging: {
            batteryTC,
            chargingSpeed,
            usbType,
            chargingFeatures,
        },
        connectivity: { networkVersion, wifiVersion, bluetoothVersion, sim },
        audioMultimedia: { speakers, headphoneJack, audioSupport, mic },
        securitySensors: { fingerprint, faceUnlock, otherSensors },
        additionalFeatures,
    } = req.body;

    if (
        [
            category,
            subCategory,
            brandModel,
            launchDate,
            price,
            dimensions,
            weight,
            colorAvailable,
            otherFeatures,
            size,
            type,
            resolution,
            cpu,
            gpu,
            os,
            memory,
            storage,
            noofCamerasMP,
            features,
            video,
            megaPixels,
            videoRecording,
            batteryTC,
            chargingSpeed,
            usbType,
            chargingFeatures,
            networkVersion,
            wifiVersion,
            bluetoothVersion,
            sim,
            speakers,
            headphoneJack,
            audioSupport,
            mic,
            fingerprint,
            faceUnlock,
            otherSensors,
            additionalFeatures,
        ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All required fields are required");
    }

    const existedDevice = await Device.findOne({
        "generalInfo.brandModel": brandModel, // Corrected this line
    });

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
            cpu,
            gpu,
            os,
            memory,
            storage,
        },
        cameraSystem: {
            rearCamera: {
                noofCamerasMP,
                video,
                features,
            },
            frontCamera: {
                megaPixels,
                videoRecording,
            },
        },
        batteryCharging: {
            batteryTC,
            chargingSpeed,
            usbType,
            chargingFeatures,
        },
        connectivity: {
            networkVersion,
            wifiVersion,
            bluetoothVersion,
            sim,
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

const getDeviceByName = asyncHandler(async (req, res) => {
    const { brandModel } = req.params;
    if (!brandModel) {
        throw new ApiError(400, "Brand model is required");
    }
    const device = await Device.findOne({
        "generalInfo.brandModel": brandModel,
    });
    if (!device) {
        throw new ApiError(404, "Device not found");
    }

    res.status(200).json(
        new ApiResponse(200, device, "Device fetched successfully")
    );
});

export { deviceList, getDevice, getDeviceByName };
