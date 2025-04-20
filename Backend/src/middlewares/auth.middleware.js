import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new Error("No token provided");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error?.message || "Invalid access token" });
    }
};

export const verifySellerJWT = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new Error("No token provided");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.seller = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error?.message || "Invalid access token" });
    }
};

export const verifyUserOrSeller = (req, res, next) => {
    verifyJWT(req, res, (error) => {
        if (error) return res.status(401).json({ error: "Invalid token" });
        
        next();
    });
};