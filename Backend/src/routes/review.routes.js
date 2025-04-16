import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createReview,
    getDeviceReviews,
    getUserReviews,
    updateReview,
    deleteReview
} from "../controllers/review.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getDeviceReviews);
router.post("/addReview", createReview);
router.patch("/:username", getUserReviews);
router.delete("/updateReview/:reviewId", updateReview);
router.delete("/deleteReview/:reviewId", deleteReview);

export default router;
