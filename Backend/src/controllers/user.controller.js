import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
const userList = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if ([username, fullname, email, password].some((field) => field?.trim() === "")) {
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

    res.status(201).json(new ApiResponse(201, user, "User registered successfully!"));
});

// Get all users
const getUser = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users.length) {
        throw new ApiError(404, "No users found");
    }

    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});

// Get user by username
const getUserByName = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if ([username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //     throw new ApiError(400, "Invalid credentials");
    // }

    res.status(200).json(new ApiResponse(200, { user }, "Login successful"));
});

const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, "User name is required");
    }

    const deletedUser = await User.findOneAndDelete({
        "username": username,
    });

    if (!deletedUser) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedUser, "User deleted successfully")
        );
});

export { userList, getUser, getUserByName, loginUser, deleteUser };