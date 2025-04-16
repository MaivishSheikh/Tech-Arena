import express from "express";
import {
    addDeviceVariant,
    getAllDeviceVariants,
    getVariantsByDeviceName,
    updateDeviceVariant,
    deleteDeviceVariant,
    getVariantsByBrand,
} from "../controllers/deviceVariant.controller.js";
import { getDeviceByCategory } from "../controllers/device.controller.js";

const router = express.Router();

// Add new device variant
router.post("/addVariants", addDeviceVariant);

// Get all device variants
router.get("/viewVariants", getAllDeviceVariants);

// Get variants by device name
router.get("/variants/:deviceName", getVariantsByDeviceName);

router.get("/brandVariants/:brand", getVariantsByBrand)

// Update a device variant by ID
router.put("/updateVariant/:variantId", updateDeviceVariant);

// Delete a device variant by ID
router.delete("/deleteVariant/:variantId", deleteDeviceVariant);

export default router;