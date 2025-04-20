import { Router } from "express";
import { addMessage, getMsg } from "../controllers/message.controller.js";

const router = Router();

router.route("/addMsg").post(addMessage);

router.get("/", getMsg);

export default router;
