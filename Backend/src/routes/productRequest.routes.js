import { Router } from "express";
import {
    getApprovedProducts,
    getRequests,
    approveRequest,
    rejectRequest,
    requestProduct,
    getRequestsBySeller,
} from "../controllers/productRequest.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Submit a new product request (with single image upload)
router.route("/addRequests").post(requestProduct);

// Get all pending requests (Admin)
router.get("/", getRequests);

router.get("/:manufacturerName", getRequestsBySeller);

// Get all approved products (Public)
router.get("/approved", getApprovedProducts);

// Approve a product request (Admin)
router.patch("/approve/:requestId", approveRequest);

// Reject a product request (Admin)
router.delete("/reject/:requestId", rejectRequest);

export default router;
