import { Router } from "express";
import { deleteSeller, getSeller, getSellerByName, loginSeller, sellerList } from "../controllers/seller.controller.js";

const router = Router();

router.route("/listSellers").post(sellerList)

router.get("/", getSeller)

router.get("/:busiName", getSellerByName)

router.route("/login").post(loginSeller)

router.delete("/deleteSeller/:busiName", deleteSeller)

export default router;
