import express from "express";
import {
    addDeviceVariant,
    getAllDeviceVariants,
    getVariantsByDeviceName,
} from "../controllers/deviceVariant.controller.js";

const router = express.Router();

router.post("/addVariants", addDeviceVariant);

router.get("/viewVariants", getAllDeviceVariants)

router.get("/variants/:deviceName", getVariantsByDeviceName);

export default router;
