// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const Cart = () => {
//   const { customerId } = useParams();
//   const [cart, setCart] = useState({ items: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const api = axios.create({
//     baseURL: "http://localhost:8000/api/v1/carts",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   });

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/");
//       setCart(response.data.data || { items: [] });
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const updateQuantity = async (deviceId, newQuantity) => {
//     try {
//       const quantity = Math.max(1, newQuantity);
//       await api.patch(`/updateCart/${deviceId}`, { quantity });
//       setCart((prevCart) => ({
//         ...prevCart,
//         items: prevCart.items.map((item) =>
//           item.device._id === deviceId ? { ...item, quantity } : item
//         ),
//       }));
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update cart");
//       fetchCart();
//     }
//   };

//   const removeItem = async (deviceId) => {
//     try {
//       await api.delete(`/deleteItems/${deviceId}`);
//       setCart((prevCart) => ({
//         ...prevCart,
//         items: prevCart.items.filter((item) => item.device._id !== deviceId),
//       }));
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to remove item");
//     }
//   };

//   const parseIndianPrice = (priceInput) => {
//     if (typeof priceInput === "number") return priceInput;
//     if (typeof priceInput === "string") {
//       return parseFloat(priceInput.replace(/₹|,/g, "")) || 0;
//     }
//     return 0;
//   };

//   // Calculate order summary
//   const subtotal = cart.items.reduce((sum, item) => {
//     const price = parseIndianPrice(item.device.generalInfo.price);
//     return sum + price * item.quantity;
//   }, 0);

//   const gst = subtotal * 0.18; // 18% GST
//   const platformFee = 49;
//   const deliveryFee = subtotal > 5000 ? 0 : 99;
//   const total = subtotal + gst + platformFee + deliveryFee;

//   const handleCheckout = async () => {
//     if (cart.items.length === 0) {
//       alert("Your cart is empty. Please add items before checkout.");
//       return;
//     }

//     try {
//       // const customerId = localStorage.getItem("userId");
//       const customerResponse = await axios.get(
//         `http://localhost:8000/api/v1/customers/${customerId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       const customerData = customerResponse.data?.data;

//       // Check if required address fields exist
//       const hasCompleteDetails =
//         customerData?.name &&
//         customerData?.mobile &&
//         customerData?.addressLine1 &&
//         customerData?.city &&
//         customerData?.pincode;

//       // Prepare cart items with ALL necessary data
//       const cartItems = cart.items.map((item) => ({
//         id: item.device._id,
//         name: item.device.generalInfo.brandModel,
//         image: item.device.deviceImage, // Fixed typo
//         price: item.device.generalInfo.price,
//         quantity: item.quantity,
//         specs: item.device.category,
//         // Include full device data as fallback
//         device: item.device,
//       }));

//       const paymentSummary = { subtotal, gst, platformFee, deliveryFee, total };

//       // Store in sessionStorage as backup
//       sessionStorage.setItem(
//         "checkoutState",
//         JSON.stringify({
//           cartItems,
//           paymentSummary,
//           // Include customer details if available
//           ...(hasCompleteDetails && {
//             customerDetails: {
//               name: customerData.name,
//               mobile: customerData.mobile,
//               address: `${customerData.addressLine1}${
//                 customerData.addressLine2
//                   ? `, ${customerData.addressLine2}`
//                   : ""
//               }`,
//               city: customerData.city,
//               pincode: customerData.pincode,
//             },
//           }),
//         })
//       );

//       console.log("Navigating with state:", {
//         cartItems,
//         customerDetails,
//         paymentSummary
//       });

//       if (hasCompleteDetails) {
//         navigate("/purchasePreview", {
//           state: {
//             cartItems,
//             customerDetails: {
//               name: customerData.name,
//               mobile: customerData.mobile,
//               address: `${customerData.addressLine1}${
//                 customerData.addressLine2
//                   ? `, ${customerData.addressLine2}`
//                   : ""
//               }`,
//               city: customerData.city,
//               pincode: customerData.pincode,
//             },
//             paymentSummary,
//           },
//           replace: true, // Important to prevent state loss
//         });
//       } else {
//         navigate("/customerDetails", {
//           state: {
//             cartItems,
//             paymentSummary,
//           },
//           replace: true, // Important to prevent state loss
//         });
//       }
//     } catch (error) {
//       console.error("Error checking customer details:", error);
//       // Prepare basic cart items if customer details fetch fails
//       const cartItems = cart.items.map((item) => ({
//         id: item.device._id,
//         name: item.device.generalInfo.brandModel,
//         image: item.device.deviceImage,
//         price: item.device.generalInfo.price,
//         quantity: item.quantity,
//         specs: item.device.category,
//       }));

//       navigate("/customerDetails", {
//         state: { cartItems },
//       });
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <i className="fas fa-spinner fa-spin text-blue-600 text-2xl"></i>
//       </div>
//     );

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
//           <h2 className="mt-2 text-xl font-semibold text-gray-600">My Cart</h2>
//           <p className="mt-1 text-gray-500">
//             Review and manage your cart items
//           </p>
//         </div>

//         {error && (
//           <div className="p-3 bg-red-50 text-red-600 text-sm rounded mb-6">
//             {error}
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Cart Items Section */}
//           <div className="lg:w-2/3">
//             {cart.items.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-md p-8 text-center mx-auto">
//                 <i className="fas fa-shopping-cart text-6xl text-gray-200 mb-4"></i>
//                 <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
//                 <button
//                   onClick={() => navigate("/deviceShowcase/All")}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-4 border-b border-gray-200">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     Cart Items ({cart.items.length})
//                   </h3>
//                 </div>

//                 {cart.items.map((item) => {
//                   const price = parseIndianPrice(item.device.generalInfo.price);
//                   return (
//                     <div
//                       key={item.device._id}
//                       className="p-6 border-b border-gray-200 flex flex-col sm:flex-row"
//                     >
//                       <div className="flex-shrink-0 mb-4 sm:mb-0">
//                         <img
//                           src={item.device.deviceImage}
//                           alt={item.device.generalInfo.brandModel}
//                           className="h-40 w-40 object-contain rounded-md"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = "https://via.placeholder.com/160";
//                           }}
//                         />
//                       </div>
//                       <div className="ml-0 sm:ml-6 flex-1">
//                         <div className="flex justify-between">
//                           <div>
//                             <h4 className="text-lg font-medium text-gray-900">
//                               {item.device.generalInfo.brandModel}
//                             </h4>
//                             <p className="mt-1 text-sm text-gray-500">
//                               {item.device.category}
//                             </p>
//                             <p className="mt-2 text-sm text-gray-900">
//                               <span className="font-medium">Color:</span>{" "}
//                               {item.device.buildDesign?.colorAvailable ||
//                                 "Not specified"}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-lg font-medium text-gray-900">
//                               ₹{(price * item.quantity).toLocaleString("en-IN")}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               ₹{price.toLocaleString("en-IN")} each
//                             </p>
//                           </div>
//                         </div>

//                         <div className="mt-4 flex justify-between items-center">
//                           <div className="flex items-center">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(
//                                   item.device._id,
//                                   item.quantity - 1
//                                 )
//                               }
//                               disabled={item.quantity <= 1}
//                               className={`px-3 py-1 border border-gray-300 rounded-l-md ${
//                                 item.quantity <= 1
//                                   ? "bg-gray-100 text-gray-400"
//                                   : "bg-white hover:bg-gray-50"
//                               }`}
//                             >
//                               -
//                             </button>
//                             <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(
//                                   item.device._id,
//                                   item.quantity + 1
//                                 )
//                               }
//                               className="px-3 py-1 border border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeItem(item.device._id)}
//                             className="text-sm text-red-600 hover:text-red-800 font-medium"
//                           >
//                             Remove Item
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Order Summary Section */}
//           {cart.items.length > 0 && (
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">
//                   Order Summary
//                 </h3>

//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <p className="text-sm text-gray-600">Subtotal</p>
//                     <p className="text-sm text-gray-900">
//                       ₹{subtotal.toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                   <div className="flex justify-between">
//                     <p className="text-sm text-gray-600">GST (18%)</p>
//                     <p className="text-sm text-gray-900">
//                       ₹{gst.toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                   <div className="flex justify-between">
//                     <p className="text-sm text-gray-600">Platform Fee</p>
//                     <p className="text-sm text-gray-900">
//                       ₹{platformFee.toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                   <div className="flex justify-between">
//                     <p className="text-sm text-gray-600">Delivery Fee</p>
//                     <p className="text-sm text-gray-900">
//                       {deliveryFee === 0 ? (
//                         <span className="text-green-600">Free</span>
//                       ) : (
//                         `₹${deliveryFee.toLocaleString("en-IN")}`
//                       )}
//                     </p>
//                   </div>
//                   <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
//                     <p className="text-base font-medium text-gray-900">
//                       Total Amount
//                     </p>
//                     <p className="text-base font-bold text-gray-900">
//                       ₹{total.toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Proceed to Checkout
//                 </button>

//                 <p className="mt-3 text-xs text-gray-500 text-center">
//                   By placing your order, you agree to our Terms of Service
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { customerId } = useParams();
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

  const parseIndianPrice = (priceInput) => {
    if (typeof priceInput === "number") return priceInput;
    if (typeof priceInput === "string") {
      return parseFloat(priceInput.replace(/₹|,/g, "")) || 0;
    }
    return 0;
  };

  // Calculate order summary
  const subtotal = cart.items.reduce((sum, item) => {
    const price = parseIndianPrice(item.device.generalInfo.price);
    return sum + price * item.quantity;
  }, 0);

  const gst = subtotal * 0.18;
  const platformFee = 49;
  const deliveryFee = subtotal > 5000 ? 0 : 99;
  const total = subtotal + gst + platformFee + deliveryFee;

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    try {
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

      // Prepare cart items with ALL necessary data
      const cartItems = cart.items.map((item) => ({
        id: item.device._id,
        name: item.device.generalInfo.brandModel,
        image: item.device.deviceImage,
        price: item.device.generalInfo.price,
        quantity: item.quantity,
        specs: item.device.category,
        color: item.device.buildDesign?.colorAvailable || "Not specified",
        device: item.device // Include full device data
      }));

      const paymentSummary = { subtotal, gst, platformFee, deliveryFee, total };

      // Store in sessionStorage as backup
      sessionStorage.setItem(
        "checkoutState",
        JSON.stringify({
          cartItems,
          paymentSummary,
          ...(hasCompleteDetails && {
            customerDetails: {
              name: customerData.name,
              mobile: customerData.mobile,
              address: `${customerData.addressLine1}${
                customerData.addressLine2 ? `, ${customerData.addressLine2}` : ""
              }`,
              city: customerData.city,
              pincode: customerData.pincode,
            },
          }),
        })
      );

      if (hasCompleteDetails) {
        navigate("/purchasePreview", {
          state: {
            cartItems,
            customerDetails: {
              name: customerData.name,
              mobile: customerData.mobile,
              address: `${customerData.addressLine1}${
                customerData.addressLine2 ? `, ${customerData.addressLine2}` : ""
              }`,
              city: customerData.city,
              pincode: customerData.pincode,
            },
            paymentSummary,
          },
        });
      } else {
        navigate("/customerDetails", {
          state: {
            cartItems,
            paymentSummary,
          },
        });
      }
    } catch (error) {
      console.error("Error checking customer details:", error);
      const cartItems = cart.items.map((item) => ({
        id: item.device._id,
        name: item.device.generalInfo.brandModel,
        image: item.device.deviceImage,
        price: item.device.generalInfo.price,
        quantity: item.quantity,
        specs: item.device.category,
      }));

      navigate("/customerDetails", {
        state: { cartItems },
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <i className="fas fa-spinner fa-spin text-blue-600 text-2xl"></i>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-600">My Cart</h2>
          <p className="mt-1 text-gray-500">Review and manage your cart items</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            {cart.items.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center mx-auto">
                <i className="fas fa-shopping-cart text-6xl text-gray-200 mb-4"></i>
                <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
                <button
                  onClick={() => navigate("/deviceShowcase/All")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Cart Items ({cart.items.length})
                  </h3>
                </div>

                {cart.items.map((item) => {
                  const price = parseIndianPrice(item.device.generalInfo.price);
                  return (
                    <div
                      key={item.device._id}
                      className="p-6 border-b border-gray-200 flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={item.device.deviceImage}
                          alt={item.device.generalInfo.brandModel}
                          className="h-40 w-40 object-contain rounded-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/160";
                          }}
                        />
                      </div>
                      <div className="ml-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              {item.device.generalInfo.brandModel}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.device.category}
                            </p>
                            <p className="mt-2 text-sm text-gray-900">
                              <span className="font-medium">Color:</span>{" "}
                              {item.device.buildDesign?.colorAvailable ||
                                "Not specified"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">
                              ₹{(price * item.quantity).toLocaleString("en-IN")}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{price.toLocaleString("en-IN")} each
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateQuantity(item.device._id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className={`px-3 py-1 border border-gray-300 rounded-l-md ${
                                item.quantity <= 1
                                  ? "bg-gray-100 text-gray-400"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.device._id, item.quantity + 1)
                              }
                              className="px-3 py-1 border border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.device._id)}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.items.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm text-gray-900">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">GST (18%)</p>
                    <p className="text-sm text-gray-900">
                      ₹{gst.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Platform Fee</p>
                    <p className="text-sm text-gray-900">
                      ₹{platformFee.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Delivery Fee</p>
                    <p className="text-sm text-gray-900">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${deliveryFee.toLocaleString("en-IN")}`
                      )}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                    <p className="text-base font-medium text-gray-900">
                      Total Amount
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      ₹{total.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Proceed to Checkout
                </button>

                <p className="mt-3 text-xs text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;