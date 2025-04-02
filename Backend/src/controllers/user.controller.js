import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log("[Auth Debug] Secrets loaded:", {
    ACCESS_TOKEN_SECRET: !!process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: !!process.env.REFRESH_TOKEN_SECRET,
});

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
    });
};
// Register a new user
const userList = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if (
        [username, fullname, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(400, "Username or Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        fullname,
        email,
        password: hashedPassword,
    });

    res.status(201).json(
        new ApiResponse(201, user, "User registered successfully!")
    );
});

// Get all users
const getUser = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password"); // Exclude password
    if (!users.length) {
        throw new ApiError(404, "No users found");
    }

    res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

// Get user by username
const getUserByName = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // const isPasswordValid = await user.isPasswordCorrect(password);
    // if (!isPasswordValid) {
    //     throw new ApiError(401, "Invalid credentials");
    // }

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Update user with refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set cookie options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Remove password from response
    const loggedInUser = await User.findById(user._id).select(
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
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(
        new ApiResponse(200, deletedUser, "User deleted successfully")
    );
});

export { userList, getUser, getUserByName, loginUser, deleteUser };
