import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getCart);
router.post("/addItems", addToCart);
router.patch("/updateCart/:deviceId", updateCartItem);
router.delete("/deleteItems/:deviceId", removeFromCart);
router.delete("/clearCart", clearCart);

export default router;
