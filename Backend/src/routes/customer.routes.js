import { Router } from "express";
import {
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
} from "../controllers/customer.controller.js";

const router = Router();

router.route("/addAddress").post(createCustomer);

router.get("/", getAllCustomers);

router.get("/:id", getCustomerById);

router.patch("/updateAddress", updateCustomer);

router.delete("/deleteAddress", deleteCustomer);

export default router;
