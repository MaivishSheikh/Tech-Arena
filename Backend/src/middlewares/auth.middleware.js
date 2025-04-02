import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Debugging logs
        console.log("=== JWT Verification Debug ===");
        console.log("Full Headers:", JSON.stringify(req.headers, null, 2));
        console.log("Raw Cookies:", req.headers.cookie);
        console.log("Parsed Cookies:", req.cookies);

        // Get token from all possible sources
        const tokenSources = {
            fromCookies: req.cookies?.accessToken,
            fromAuthHeader: req
                .header("Authorization")
                ?.replace(/^Bearer\s+/i, ""),
            fromQuery: req.query?.token,
        };

        console.log("Token Sources:", JSON.stringify(tokenSources, null, 2));

        const token =
            tokenSources.fromCookies ||
            tokenSources.fromAuthHeader ||
            tokenSources.fromQuery;

        if (!token) {
            console.error("Token missing from all sources");
            throw new ApiError(401, "Unauthorized: No token provided");
        }

        // Verify token structure (basic check)
        if (typeof token !== "string" || token.split(".").length !== 3) {
            console.error("Invalid token structure:", token);
            throw new ApiError(401, "Unauthorized: Invalid token format");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            ignoreExpiration: false,
        });

        console.log("Token successfully decoded:", {
            userId: decoded._id,
            iat: decoded.iat,
            exp: decoded.exp,
        });

        // Attach user to request
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Failed:", {
            errorName: error.name,
            errorMessage: error.message,
            token: error.token || "none",
            stack: error.stack,
        });

        let message = "Unauthorized";
        if (error.name === "TokenExpiredError") {
            message = "Session expired - please login again";
        } else if (error.name === "JsonWebTokenError") {
            message = "Invalid authentication token";
        }

        // Send proper error response
        res.status(401).json(new ApiResponse(401, null, message));
    }
});
