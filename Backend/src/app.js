import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import deviceRouter from "./routes/device.routes.js";
import brandRouter from "./routes/brand.routes.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import deviceVariantRouter from "./routes/deviceVariant.routes.js";
import cartRouter from "./routes/cart.routes.js";
import customerRouter from "./routes/customer.routes.js";

app.use("/api/v1/devices", deviceRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sellers", sellerRouter);
app.use("/api/v1/deviceVariants", deviceVariantRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/customers", customerRouter)

export { app };
