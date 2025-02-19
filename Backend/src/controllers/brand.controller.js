import { asyncHandler } from "../utils/asyncHandler.js";
import { Brand } from "../models/brand.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const brandList = asyncHandler(async (req, res) => {
    const { title, width, height } = req.body;

    if ([title, width, height].some((field) => !field?.trim())) {
        throw new ApiError(400, "All required fields are required");
    }

    const existedBrand = await Brand.findOne({ title });

    if (existedBrand) {
        throw new ApiError(400, "Brand with this title already exists");
    }

    const brandImageLocalPath = req.files?.brandImage?.[0]?.path;

    if (!brandImageLocalPath) {
        throw new ApiError(400, "Brand image file is required");
    }

    const brandImage = await uploadOnCloudinary(brandImageLocalPath);

    if (!brandImage) {
        throw new ApiError(500, "Failed to upload brand image");
    }

    const brand = await Brand.create({
        title,
        brandImage: brandImage.url,
        width,
        height,
    });

    res.status(201).json(
        new ApiResponse(201, brand, "Brand added successfully!")
    );
});

const getBrand = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    if (!brands.length) {
        throw new ApiError(404, "No brands found");
    }

    res.status(200).json(
        new ApiResponse(200, brands, "Brands fetched successfully")
    );
});

const getBrandByName = asyncHandler(async (req, res) => {
    const { title } = req.params;
    if (!title) {
        throw new ApiError(400, "Brand name is required");
    }

    const brand = await Brand.findOne({ title });
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }

    res.status(200).json(
        new ApiResponse(200, brand, "Brand fetched successfully")
    );
});

export { brandList, getBrand, getBrandByName };
