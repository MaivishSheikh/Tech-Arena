import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/carts",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      setCart(response.data.data || { items: [] });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (deviceId, newQuantity) => {
    try {
      const quantity = Math.max(1, newQuantity);
      await api.patch(`/updateCart/${deviceId}`, { quantity });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.device._id === deviceId ? { ...item, quantity } : item
        ),
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart");
      fetchCart();
    }
  };

  const removeItem = async (deviceId) => {
    try {
      await api.delete(`/deleteItems/${deviceId}`);
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.device._id !== deviceId),
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  const parseIndianPrice = (priceStr) => {
    // Remove ₹ symbol and commas, then convert to number
    return parseFloat(priceStr.replace(/₹|,/g, "")) || 0;
  };

  const totalAmount = cart.items.reduce((sum, item) => {
    const price = parseIndianPrice(item.device.generalInfo.price);
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    try {
      // Check if customer has existing details
      const customerResponse = await axios.get(
        `http://localhost:8000/api/v1/customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const customerData = customerResponse.data?.data;

      // Check if required address fields exist
      const hasCompleteDetails =
        customerData?.name &&
        customerData?.mobile &&
        customerData?.addressLine1 &&
        customerData?.city &&
        customerData?.pincode;

      // Prepare cart items
      const formattedCartItems = cart.items.map((item) => ({
        id: item.device._id,
        name: item.device.generalInfo.brandModel,
        image: item.device.deviceImage,
        price: parseIndianPrice(item.device.generalInfo.price),
        quantity: item.quantity,
        specs: item.device.category || "No description available",
      }));

      if (hasCompleteDetails) {
        // If details exist, go directly to purchase preview
        navigate("/purchasePreview", {
          state: {
            cartItems: formattedCartItems,
            customerDetails: {
              name: customerData.name,
              mobile: customerData.mobile,
              addressLine1: customerData.addressLine1,
              addressLine2: customerData.addressLine2 || "",
              city: customerData.city,
              pincode: customerData.pincode,
            },
          },
        });
      } else {
        // If details are incomplete, proceed to customer details
        proceedToCustomerDetails();
      }
    } catch (error) {
      console.error("Error checking customer details:", error);
      // On any error, proceed to customer details
      proceedToCustomerDetails();
    }
  };

  // Helper function to navigate to customer details
  const proceedToCustomerDetails = () => {
    const formattedCartItems = cart.items.map((item) => ({
      id: item.device._id,
      name: item.device.generalInfo.brandModel,
      image: item.device.deviceImage,
      price: parseIndianPrice(item.device.generalInfo.price),
      quantity: item.quantity,
      specs: item.device.category || "No description available",
    }));

    navigate("/customerDetails", {
      state: {
        cartItems: formattedCartItems,
      },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <i className="fas fa-spinner fa-spin text-blue-600 text-2xl"></i>
      </div>
    );

  return (
    <div className="min-h-screen py-5">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-5">
        {/* Left side - Cart items */}
        <div className="w-full lg:w-2/3 bg-white rounded-sm shadow-sm">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <i className="fas fa-shopping-cart text-blue-600 mr-2"></i>
            <h2 className="text-lg font-medium text-gray-800">
              My Cart ({cart.items.length})
            </h2>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm mx-4 my-2 rounded">
              {error}
            </div>
          )}

          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-500">
              <i className="fas fa-shopping-cart text-6xl text-gray-200 mb-4"></i>
              <p className="text-lg mb-5">Your cart is empty</p>
              <button
                onClick={() => navigate("/deviceShowcase/All")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-sm font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {cart.items.map((item) => (
                <div
                  key={item.device._id}
                  className="p-5 border-b border-gray-200 flex"
                >
                  <div className="w-20 h-20 mr-5 flex-shrink-0">
                    <img
                      src={item.device.deviceImage}
                      alt={item.device.deviceID}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-base font-medium text-gray-800">
                        {item.device.generalInfo.brandModel}
                      </h3>
                      <p className="text-base font-medium text-gray-800">
                        ₹
                        {(
                          parseIndianPrice(item.device.generalInfo.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {item.device.category || "No description available"}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {item.device.generalInfo.price.toLocaleString()}
                    </p>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.device._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className={`w-8 h-8 border border-gray-300 bg-white text-lg ${
                          item.quantity <= 1
                            ? "opacity-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b border-gray-300 text-center leading-8 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.device._id, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-gray-300 bg-white text-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.device._id)}
                        className="ml-5 text-blue-600 text-sm font-medium hover:text-blue-800"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Price details */}
        {cart.items.length > 0 && (
          <div className="w-full lg:w-1/3 bg-white rounded-sm shadow-sm sticky top-5">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-500">
                PRICE DETAILS
              </h3>
            </div>
            <div className="p-5">
              <div className="flex justify-between mb-4">
                <span className="text-base">
                  Price ({cart.items.length} items)
                </span>
                <span className="text-base">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-base">Delivery Charges</span>
                <span className="text-base text-green-600">FREE</span>
              </div>
              <div className="border-t border-dashed border-gray-300 pt-4 mb-4 flex justify-between">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-lg font-medium">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-sm font-medium mt-3"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
