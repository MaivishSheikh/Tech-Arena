import { Router } from "express";
import { deviceList, getDevice } from "../controllers/device.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

console.log("Devices function:", deviceList); 
console.log("GetDevice function:", getDevice);

const router = Router();

router.route("/listDevices").post(
    upload.fields([
        {
            name: "deviceImage",
            maxCount: 1,
        },
        {
            name: "alternateImage",
            maxCount: 1,
        },
    ]),
    deviceList
);

router.get("/", getDevice);

export default router;
