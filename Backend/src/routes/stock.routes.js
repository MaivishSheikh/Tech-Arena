import { Router } from "express";
import { verifyJWT, verifySellerJWT } from "../middlewares/auth.middleware.js";
import {
    getStock,
    addToStock,
    updateStockItem,
    removeFromStock,
    clearStock,
} from "../controllers/stock.controller.js";

const router = Router();

router.get("/", verifyJWT, getStock);

router.post("/addItems", verifySellerJWT, addToStock);
router.patch("/updateStock/:deviceId", verifySellerJWT, updateStockItem);
router.delete("/deleteItems/:deviceId", verifySellerJWT, removeFromStock);
router.delete("/clearStock", verifySellerJWT, clearStock);

export default router;