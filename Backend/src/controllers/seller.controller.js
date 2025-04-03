import { asyncHandler } from "../utils/asyncHandler.js";
import { Seller } from "../models/seller.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sellerList = asyncHandler(async (req, res) => {
    const { name, email, password, phone, busiName, busiAddress, gstNo } =
        req.body;

    if (
        [name, email, password, phone, busiName, busiAddress, gstNo].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedSeller = await Seller.findOne({
        $or: [{ busiName }, { email }],
    });

    if (existedSeller) {
        throw new ApiError(400, "Business or Email already exists");
    }
    
    const lastSeller = await Seller.findOne().sort({ _id: -1 });
    let newSellerID = "S100";

    if (lastSeller && lastSeller.sellerID) {
        const lastIDNumber = parseInt(lastSeller.sellerID.slice(1), 10);
        newSellerID = `S${lastIDNumber + 1}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
        sellerID: newSellerID,
        name,
        email,
        password: hashedPassword,
        phone,
        busiName,
        busiAddress,
        gstNo,
    });

    console.log(seller)

    res.status(201).json(
        new ApiResponse(201, seller, "Seller registered successfully!")
    );
});

const getSeller = asyncHandler(async (req, res) => {
    const sellers = await Seller.find();
    if (!sellers.length) {
        throw new ApiError(404, "No sellers found");
    }

    res.status(200).json(
        new ApiResponse(200, sellers, "Sellers fetched successfully")
    );
});

const getSellerByName = asyncHandler(async (req, res) => {
    const { busiName } = req.params;

    if (!busiName) {
        throw new ApiError(400, "Business Name is required");
    }

    const seller = await Seller.findOne({ busiName });

    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }

    res.status(200).json(
        new ApiResponse(200, seller, "Seller fetched successfully")
    );
});

const loginSeller = asyncHandler(async (req, res) => {
    const { busiName, email } = req.body;

    if ([busiName, email].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const seller = await Seller.findOne({ busiName });

    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }
    console.log(seller)

    // const isMatch = await bcrypt.compare(password, seller.password);
    // if (!isMatch) {
    //     throw new ApiError(400, "Invalid credentials");
    // }

    res.status(200).json(new ApiResponse(200, { seller }, "Login successful"));
});

const deleteSeller = asyncHandler(async (req, res) => {
    const { busiName } = req.params;

    if (!busiName) {
        throw new ApiError(400, "Business name is required");
    }

    const deletedSeller = await Seller.findOneAndDelete({
        busiName: busiName,
    });

    if (!deletedSeller) {
        throw new ApiError(404, "Seller not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedSeller, "Seller deleted successfully")
        );
});

export { sellerList, getSeller, getSellerByName, loginSeller, deleteSeller };
