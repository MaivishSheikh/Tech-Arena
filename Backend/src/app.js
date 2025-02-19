import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import deviceRouter from "./routes/device.routes.js"
import brandRouter from "./routes/brand.routes.js"

app.use("/api/v1/devices", deviceRouter)
app.use("/api/v1/brands", brandRouter)

export { app };
