import { Router } from "express";
import { deviceList, getDevice, getDeviceByName } from "../controllers/device.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

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

router.get('/:brandModel', getDeviceByName);

export default router;
