import { asyncHandler } from "../utils/asyncHandler.js";
import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new customer
const createCustomer = asyncHandler(async (req, res) => {
    const { name, mobile, address, city, pincode } = req.body;

    // Validate required fields
    if (
        [name, mobile, address, city, pincode].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const lastCustomer = await Customer.findOne().sort({ _id: -1 });
    let newCustomerID = "C100";

    if (lastCustomer && lastCustomer.customerID) {
        const lastIDNumber = parseInt(lastCustomer.customerID.slice(1), 10);
        newCustomerID = `C${lastIDNumber + 1}`;
    }

    // Create customer
    const customer = await Customer.create({
        customerID: newCustomerID,
        name,
        mobile,
        address,
        city,
        pincode,
    });

    if (!customer) {
        throw new ApiError(500, "Something went wrong while creating customer");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, customer, "Customer created successfully"));
});

// Get all customers
const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find().sort({ createdAt: -1 });

    if (!customers.length) {
        throw new ApiError(404, "No customers found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, customers, "Customers fetched successfully")
        );
});

// Get customer by ID
const getCustomerById = asyncHandler(async (req, res) => {
    const { customerID } = req.params;
    if (!customerID) {
        throw new ApiError(400, "Customer ID is required");
    }

    const customer = await Customer.findOne({ customerID: customerID });

    if (!customer) {
        throw new ApiError(404, "Customer not found");
    }

    res.status(200).json(
        new ApiResponse(200, customer, "Customer fetched successfully")
    );
});

// Update customer
const updateCustomer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, mobile, address, city, pincode } = req.body;

    if (!id) {
        throw new ApiError(400, "Customer ID is required");
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        {
            $set: {
                name,
                mobile,
                address,
                city,
                pincode,
            },
        },
        { new: true }
    );

    if (!updatedCustomer) {
        throw new ApiError(404, "Customer not found or update failed");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCustomer,
                "Customer updated successfully"
            )
        );
});

// Delete customer
const deleteCustomer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Customer ID is required");
    }

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
        throw new ApiError(404, "Customer not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedCustomer,
                "Customer deleted successfully"
            )
        );
});

export {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
