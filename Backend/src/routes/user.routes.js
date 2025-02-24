import { Router } from "express";
import { userList, getUser, getUserByName, loginUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/listUsers").post(userList);

router.get("/", getUser);

router.get("/:username", getUserByName);

router.route("/login").post(loginUser)

export default router;
