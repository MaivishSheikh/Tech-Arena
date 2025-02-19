import { Router } from "express";
import { brandList, getBrand, getBrandByName } from "../controllers/brand.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/listBrands").post(
    upload.fields([
        {
            name: "brandImage",
            maxCount: 1,
        }
    ]),
    brandList
);

router.get("/", getBrand);

router.get('/:title', getBrandByName);

router.get('/day', (req, res) => {
    res.send('GET request to homepage')
})

export default router;
