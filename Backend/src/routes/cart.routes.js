import { Router } from "express";
import {
    getCart,
    removeFromCart,
    clearCart,
    addToCart,
    updateCartItem,
} from "../controllers/cart.controller.js";

const router = Router();

router.use((req, res, next) => {
    // TEMPORARY: Mock authenticated user for testing
    req.user = { 
      _id: "507f1f77bcf86cd799439011" // Any mock ObjectId
    };
    next();
  });

router.get("/", getCart);

router.post("/addItem", addToCart);

router.route('/updateItem/:deviceId')
  .post(updateCartItem)

router.delete("/removeItem/:deviceId", removeFromCart);

router.delete("/clear", clearCart);

export default router;
