// import { asyncHandler } from "../utils/asyncHandler.js";
// import { Seller } from "../models/seller.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const sellerList = asyncHandler(async (req, res) => {
//     const { name, email, password, phone, companyName, busiAddress, gstNo } =
//         req.body;

//     if (
//         [name, email, password, phone, companyName, busiAddress, gstNo].some(
//             (field) => field?.trim() === ""
//         )
//     ) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const existedSeller = await Seller.findOne({
//         $or: [{ companyName }, { email }],
//     });

//     if (existedSeller) {
//         throw new ApiError(400, "Business or Email already exists");
//     }

//     const lastSeller = await Seller.findOne().sort({ _id: -1 });
//     let newSellerID = "S100";

//     if (lastSeller && lastSeller.sellerID) {
//         const lastIDNumber = parseInt(lastSeller.sellerID.slice(1), 10);
//         newSellerID = `S${lastIDNumber + 1}`;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const seller = await Seller.create({
//         sellerID: newSellerID,
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         companyName,
//         busiAddress,
//         gstNo,
//     });

//     console.log(seller)

//     res.status(201).json(
//         new ApiResponse(201, seller, "Seller registered successfully!")
//     );
// });

// const getSeller = asyncHandler(async (req, res) => {
//     const sellers = await Seller.find();
//     if (!sellers.length) {
//         throw new ApiError(404, "No sellers found");
//     }

//     res.status(200).json(
//         new ApiResponse(200, sellers, "Sellers fetched successfully")
//     );
// });

// const getSellerByName = asyncHandler(async (req, res) => {
//     const { companyName } = req.params;

//     if (!companyName) {
//         throw new ApiError(400, "Business Name is required");
//     }

//     const seller = await Seller.findOne({ companyName });

//     if (!seller) {
//         throw new ApiError(404, "Seller not found");
//     }

//     res.status(200).json(
//         new ApiResponse(200, seller, "Seller fetched successfully")
//     );
// });

// const loginSeller = asyncHandler(async (req, res) => {
//     const { companyName, email } = req.body;

//     if ([companyName, email].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const seller = await Seller.findOne({ companyName });

//     if (!seller) {
//         throw new ApiError(404, "Seller not found");
//     }
//     console.log(seller)

//     // const isMatch = await bcrypt.compare(password, seller.password);
//     // if (!isMatch) {
//     //     throw new ApiError(400, "Invalid credentials");
//     // }

//     res.status(200).json(new ApiResponse(200, { seller }, "Login successful"));
// });

// const deleteSeller = asyncHandler(async (req, res) => {
//     const { companyName } = req.params;

//     if (!companyName) {
//         throw new ApiError(400, "Business name is required");
//     }

//     const deletedSeller = await Seller.findOneAndDelete({
//         companyName: companyName,
//     });

//     if (!deletedSeller) {
//         throw new ApiError(404, "Seller not found");
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, deletedSeller, "Seller deleted successfully")
//         );
// });

// export { sellerList, getSeller, getSellerByName, loginSeller, deleteSeller };

import { asyncHandler } from "../utils/asyncHandler.js";
import { Seller } from "../models/seller.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (sellerId) => {
    return jwt.sign({ sellerId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
    });
};

const generateRefreshToken = (sellerId) => {
    return jwt.sign({ sellerId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    });
};

const sellerList = asyncHandler(async (req, res) => {
    const { name, email, password, phone, companyName, busiAddress, gstNo } =
        req.body;

    if (
        [name, email, password, phone, companyName, busiAddress, gstNo].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedSeller = await Seller.findOne({
        $or: [{ companyName }, { email }],
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
        companyName,
        busiAddress,
        gstNo,
    });

    const createdSeller = await Seller.findById(seller._id).select(
        "-password -refreshToken"
    );

    if (!createdSeller) {
        throw new ApiError(
            500,
            "Something went wrong while registering the seller"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdSeller,
                "Seller registered successfully!"
            )
        );
});

const getSeller = asyncHandler(async (req, res) => {
    const sellers = await Seller.find().select("-password -refreshToken");
    if (!sellers.length) {
        throw new ApiError(404, "No sellers found");
    }

    res.status(200).json(
        new ApiResponse(200, sellers, "Sellers fetched successfully")
    );
});

const getSellerByName = asyncHandler(async (req, res) => {
    const { companyName } = req.params;

    if (!companyName) {
        throw new ApiError(400, "Business Name is required");
    }

    const seller = await Seller.findOne({ companyName }).select(
        "-password -refreshToken"
    );

    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }

    res.status(200).json(
        new ApiResponse(200, seller, "Seller fetched successfully")
    );
});

const loginSeller = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const seller = await Seller.findOne({ email });
    if (!seller) {
        throw new ApiError(404, "Seller not found");
    }

    // const isPasswordValid = await seller.isPasswordCorrect(password);
    // if (!isPasswordValid) {
    //     throw new ApiError(401, "Invalid credentials");
    // }

    const accessToken = seller.generateAuthToken();
    const refreshToken = seller.generateRefreshToken();

    // Update seller with refresh token
    seller.refreshToken = refreshToken;
    await seller.save({ validateBeforeSave: false });

    // Set cookie options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Remove password from response
    const loggedInSeller = await Seller.findById(seller._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    seller: loggedInSeller,
                    accessToken,
                    refreshToken,
                },
                "Seller logged in successfully"
            )
        );
});

// const loginSeller = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         throw new ApiError(400, "Email and password are required");
//     }

//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//         throw new ApiError(404, "Seller not found");
//     }

//     const isPasswordValid = await seller.isPasswordCorrect(password);
//     if (!isPasswordValid) {
//         throw new ApiError(401, "Invalid seller credentials");
//     }

//     // Use the methods from the model
//     const accessToken = seller.generateAccessToken();
//     const refreshToken = seller.generateRefreshToken();

//     seller.refreshToken = refreshToken;
//     await seller.save({ validateBeforeSave: false });

//     const options = {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "none", // Changed from 'strict' for cross-site
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//     };

//     return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", refreshToken, options)
//         .json(
//             new ApiResponse(
//                 200,
//                 {
//                     seller: loggedInSeller,
//                     // Optionally include tokens in response if needed
//                     accessToken,
//                     refreshToken,
//                 },
//                 "Seller logged in successfully"
//             )
//         );
// });

const logoutSeller = asyncHandler(async (req, res) => {
    await Seller.findByIdAndUpdate(
        req.seller._id,
        {
            $unset: { refreshToken: 1 },
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Seller logged out successfully"));
});

const deleteSeller = asyncHandler(async (req, res) => {
    const { companyName } = req.params;

    if (!companyName) {
        throw new ApiError(400, "Business name is required");
    }

    const deletedSeller = await Seller.findOneAndDelete({
        companyName: companyName,
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

export {
    sellerList,
    getSeller,
    getSellerByName,
    loginSeller,
    logoutSeller,
    deleteSeller,
};
