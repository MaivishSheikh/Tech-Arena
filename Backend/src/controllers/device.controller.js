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
        "generalInfo.brandModel": brandModel,
    });

    if (existedDevice) {
        throw new ApiError(400, "Device already exists");
    }

    const lastDevice = await Device.findOne().sort({ _id: -1 }); 
    let newDeviceID = "D100"; 

    if (lastDevice && lastDevice.deviceID) {
        const lastIDNumber = parseInt(lastDevice.deviceID.slice(1), 10); 
        newDeviceID = `D${lastIDNumber + 1}`; 
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
        deviceID: newDeviceID, 
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

const getDeviceByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    console.log("Category received:", category);

    if (!category) {
        return res.status(400).json({ error: "Device Category is required" });
    }

    const allCategories = ["Phone", "Tablet", "Laptop"];

    let filter = {};
    if (category === "All") {
        filter = {
            category: { $in: allCategories },
        };
    } else {
        filter = {
            $or: [
                { category: category },
                {
                    category: {
                        $regex: new RegExp(`(^|, )${category}($|, )`, "i"),
                    },
                },
            ],
        };
    }

    try {
        const devices = await Device.find(filter);

        console.log("Devices found:", devices);

        if (!devices || devices.length === 0) {
            return res
                .status(404)
                .json({ error: "No devices found for this category" });
        }

        res.status(200).json({ success: true, data: devices });
    } catch (error) {
        console.error("Error fetching devices:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const deleteDeviceByName = asyncHandler(async (req, res) => {
    const { brandModel } = req.params;

    if (!brandModel) {
        throw new ApiError(400, "Brand model is required");
    }

    const deletedDevice = await Device.findOneAndDelete({
        "generalInfo.brandModel": brandModel,
    });

    if (!deletedDevice) {
        throw new ApiError(404, "Device not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedDevice, "Device deleted successfully")
        );
});

export { deviceList, getDevice, getDeviceByName, getDeviceByCategory, deleteDeviceByName };
