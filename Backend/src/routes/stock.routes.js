// // import { Router } from "express";
// // import { verifySellerJWT } from "../middlewares/auth.middleware.js";
// // import {
// //     getStock,
// //     addToStock,
// //     updateStockItem,
// //     removeFromStock,
// //     clearStock,
// // } from "../controllers/stock.controller.js";

// // const router = Router();

// // router.use(verifySellerJWT);

// // router.get("/", getStock);
// // router.post("/addItems", addToStock);
// // router.patch("/updateStock/:deviceId", updateStockItem);
// // router.delete("/deleteItems/:deviceId", removeFromStock);
// // router.delete("/clearStock", clearStock);

// // export default router;

// import { Router } from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { verifySellerJWT } from "../middlewares/auth.middleware.js";
// import {
//     getStock,
//     addToStock,
//     updateStockItem,
//     removeFromStock,
//     clearStock,
// } from "../controllers/stock.controller.js";

// const router = Router();

// // Custom middleware to handle both seller and user authentication
// const verifyUserOrSeller = (req, res, next) => {
//     // Try seller verification first
//     verifySellerJWT(req, res, (err) => {
//         if (!err) {
//             // If seller verification succeeds, continue
//             return next();
//         }
        
//         // If seller verification fails, try regular user verification
//         verifyJWT(req, res, next);
//     });
// };

// router.use(verifyUserOrSeller);

// router.get("/", getStock);
// router.post("/addItems", addToStock);
// router.patch("/updateStock/:deviceId", updateStockItem);
// router.delete("/deleteItems/:deviceId", removeFromStock);
// router.delete("/clearStock", clearStock);

// export default router;

import { Router } from "express";
import { verifyJWT, verifySellerJWT, verifyUserOrSeller } from "../middlewares/auth.middleware.js";
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