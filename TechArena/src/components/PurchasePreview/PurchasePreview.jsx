// // // import React, { useState } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";

// // // const PurchasePreview = () => {
// // //   const navigate = useNavigate();
// // //   const { state } = useLocation();
// // //   const [quantity, setQuantity] = useState(1);

// // //   // Get current date and format it
// // //   const currentDate = new Date();
// // //   const formattedDate = currentDate.toLocaleDateString("en-US", {
// // //     weekday: "long",
// // //     year: "numeric",
// // //     month: "long",
// // //     day: "numeric",
// // //   });

// // //   const customerDetails = state?.customerDetails || {
// // //     name: "John Doe",
// // //     mobile: "9876543210",
// // //     address: "123 Tech Street",
// // //     city: "Bangalore",
// // //     pincode: "560001",
// // //   };

// // //   // Get the device from location state (passed from Devices page)
// // //   const device = state?.cartItems || {
// // //     _id: "default-id",
// // //     generalInfo: {
// // //       brandModel: "Smartphone X Pro",
// // //       price: 54999,
// // //     },
// // //     deviceImage: "https://via.placeholder.com/80",
// // //     category: "Smartphone",
// // //     buildDesign: {
// // //       colorAvailable: "Midnight Black",
// // //     },
// // //   };
// // //   const parseIndianPrice = (priceInput) => {
// // //     if (typeof priceInput === 'number') return priceInput;
// // //     if (typeof priceInput === 'string') {
// // //       return parseFloat(priceInput.replace(/₹|,/g, '')) || 0;
// // //     }
// // //     return 0;
// // //   };

// // //   const devicePrice = parseIndianPrice(device.generalInfo.price);

// // //   // Handle quantity changes
// // //   const increaseQuantity = () => {
// // //     setQuantity((prev) => prev + 1);
// // //   };

// // //   const decreaseQuantity = () => {
// // //     if (quantity > 1) {
// // //       setQuantity((prev) => prev - 1);
// // //     }
// // //   };

// // //   // Create cartItems array with current quantity
// // //   const cartItems = [
// // //     {
// // //       id: device._id,
// // //       name: device.generalInfo.brandModel,
// // //       image: device.deviceImage,
// // //       price: devicePrice,
// // //       quantity: quantity,
// // //       specs: device.category,
// // //     },
// // //   ];

// // //   // Calculate totals based on quantity
// // //   const subtotal = cartItems.reduce(
// // //     (sum, item) => sum + item.price * item.quantity,
// // //     0
// // //   );
// // //   const gst = subtotal * 0.18; // 18% GST
// // //   const platformFee = subtotal * 0.01;
// // //   const deliveryFee = subtotal > 5000 ? 0 : 99; // Free delivery above 5000
// // //   const total = subtotal + gst + platformFee + deliveryFee;

// // //   const handleProceedToPayment = () => {
// // //     navigate("/payment", {
// // //       state: {
// // //         customerDetails,
// // //         cartItems,
// // //         paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
// // //       },
// // //     });
// // //   };

// // //   return (
// // //     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         {/* Date Display */}
// // //         <div className="text-right mb-2 text-sm" style={{fontSize: "16px", fontFamily: "Poppins"}}>
// // //           {formattedDate}
// // //         </div>

// // //         <div className="text-center mb-8">
// // //           <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
// // //           <h2 className="mt-2 text-xl font-semibold text-gray-600">
// // //             Order Summary
// // //           </h2>
// // //           <p className="mt-1 text-gray-500">Review your order before payment</p>
// // //         </div>

// // //         {/* Customer Details Section */}
// // //         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// // //           <div className="flex justify-between items-center mb-4">
// // //             <h3 className="text-lg font-medium text-gray-900">
// // //               Customer Details
// // //             </h3>
// // //             <button
// // //               onClick={() =>
// // //                 navigate("/customerDetails", {
// // //                   state: { customerDetails, device },
// // //                 })
// // //               }
// // //               className="text-sm text-indigo-600 hover:text-indigo-800"
// // //             >
// // //               Edit
// // //             </button>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Name</p>
// // //               <p className="mt-1 text-sm text-gray-900">
// // //                 {customerDetails.name}
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Mobile Number</p>
// // //               <p className="mt-1 text-sm text-gray-900">
// // //                 {customerDetails.mobile}
// // //               </p>
// // //             </div>
// // //             <div className="md:col-span-2">
// // //               <p className="text-sm font-medium text-gray-500">Address</p>
// // //               <p className="mt-1 text-sm text-gray-900">
// // //                 {customerDetails.address}, {customerDetails.city} -{" "}
// // //                 {customerDetails.pincode}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Device Section */}
// // //         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// // //           <h3 className="text-lg font-medium text-gray-900 mb-4">
// // //             Your Device
// // //           </h3>

// // //           <div className="divide-y divide-gray-200">
// // //             <div className="py-4 flex flex-col sm:flex-row">
// // //               <div className="flex-shrink-0">
// // //                 <img
// // //                   className="h-20 w-20 rounded-md object-cover"
// // //                   src={device.deviceImage}
// // //                   alt={device.generalInfo.brandModel}
// // //                   onError={(e) => {
// // //                     e.target.onerror = null;
// // //                     e.target.src = "https://via.placeholder.com/80";
// // //                   }}
// // //                 />
// // //               </div>
// // //               <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
// // //                 <div className="flex justify-between">
// // //                   <div>
// // //                     <h4 className="text-base font-medium text-gray-900">
// // //                       {device.generalInfo.brandModel}
// // //                     </h4>
// // //                     <p className="mt-1 text-sm text-gray-500">
// // //                       {device.category}
// // //                     </p>
// // //                   </div>
// // //                   <p className="text-base font-medium text-gray-900">
// // //                     <span className="text-gray-400">Price: </span>
// // //                     <span>{devicePrice.toLocaleString("en-IN")}</span>
// // //                   </p>
// // //                 </div>
// // //                 <div className="mt-2 flex justify-between items-center">
// // //                   <div className="flex items-center">
// // //                     <button
// // //                       onClick={decreaseQuantity}
// // //                       className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
// // //                       disabled={quantity <= 1}
// // //                     >
// // //                       -
// // //                     </button>
// // //                     <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
// // //                       {quantity}
// // //                     </span>
// // //                     <button
// // //                       onClick={increaseQuantity}
// // //                       className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
// // //                     >
// // //                       +
// // //                     </button>
// // //                   </div>
// // //                   <p className="text-base font-medium text-gray-900">
// // //                     <span className="text-gray-400">Total Amount: </span>
// // //                     <span>
// // //                       ₹{(devicePrice * quantity).toLocaleString("en-IN")}
// // //                     </span>
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Payment Summary Section */}
// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <h3 className="text-lg font-medium text-gray-900 mb-4">
// // //             Payment Summary
// // //           </h3>

// // //           <div className="space-y-3">
// // //             <div className="flex justify-between">
// // //               <p className="text-sm text-gray-600">Subtotal</p>
// // //               <p className="text-sm text-gray-900">
// // //                 ₹{subtotal.toLocaleString("en-IN")}
// // //               </p>
// // //             </div>
// // //             <div className="flex justify-between">
// // //               <p className="text-sm text-gray-600">GST (18%)</p>
// // //               <p className="text-sm text-gray-900">
// // //                 ₹{gst.toLocaleString("en-IN")}
// // //               </p>
// // //             </div>
// // //             <div className="flex justify-between">
// // //               <p className="text-sm text-gray-600">Platform Fee</p>
// // //               <p className="text-sm text-gray-900">
// // //                 ₹{platformFee.toLocaleString("en-IN")}
// // //               </p>
// // //             </div>
// // //             <div className="flex justify-between">
// // //               <p className="text-sm text-gray-600">Delivery Fee</p>
// // //               <p className="text-sm text-gray-900">
// // //                 {deliveryFee === 0 ? (
// // //                   <span className="text-green-600">Free</span>
// // //                 ) : (
// // //                   `₹${deliveryFee.toLocaleString("en-IN")}`
// // //                 )}
// // //               </p>
// // //             </div>
// // //             <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
// // //               <p className="text-base font-medium text-gray-900">
// // //                 Total Amount
// // //               </p>
// // //               <p className="text-base font-bold text-gray-900">
// // //                 ₹{total.toLocaleString("en-IN")}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="mt-8">
// // //             <button
// // //               onClick={handleProceedToPayment}
// // //               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// // //             >
// // //               Proceed to Payment
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PurchasePreview;

// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";

// // const PurchasePreview = () => {
// //   const navigate = useNavigate();
// //   const { state } = useLocation();
// //   const [quantities, setQuantities] = useState({});

// //   console.log("CustomerDetails received state:", location.state);

// // // In PurchasePreview.js:
// // console.log("PurchasePreview received state:", location.state);

// //   // Get current date and format it
// //   const currentDate = new Date();
// //   const formattedDate = currentDate.toLocaleDateString("en-US", {
// //     weekday: "long",
// //     year: "numeric",
// //     month: "long",
// //     day: "numeric",
// //   });

// //   // Initialize quantities from cartItems
// //   useEffect(() => {
// //     if (state?.cartItems) {
// //       const initialQuantities = {};
// //       state.cartItems.forEach((item) => {
// //         initialQuantities[item.id] = item.quantity;
// //       });
// //       setQuantities(initialQuantities);
// //     }
// //   }, [state?.cartItems]);

// //   const customerDetails = state?.customerDetails || {
// //     name: "John Doe",
// //     mobile: "9876543210",
// //     address: "123 Tech Street",
// //     city: "Bangalore",
// //     pincode: "560001",
// //   };

// //   const parseIndianPrice = (priceInput) => {
// //     if (typeof priceInput === "number") return priceInput;
// //     if (typeof priceInput === "string") {
// //       return parseFloat(priceInput.replace(/₹|,/g, "")) || 0;
// //     }
// //     return 0;
// //   };

// //   // Handle quantity changes
// //   const increaseQuantity = (id) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [id]: (prev[id] || 1) + 1,
// //     }));
// //   };

// //   const decreaseQuantity = (id) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [id]: Math.max(1, (prev[id] || 1) - 1),
// //     }));
// //   };

// //   // Create cartItems array with current quantities
// //   const cartItems = (state?.cartItems || []).map((item) => ({
// //     ...item,
// //     quantity: quantities[item.id] || item.quantity,
// //     price: parseIndianPrice(item.price),
// //     // Ensure we have all required fields with proper fallbacks
// //     name: item.name || "Unknown Device",
// //     image: item.image || "https://via.placeholder.com/80",
// //     specs: item.specs || "Unknown Category",
// //   }));

// //   // Calculate totals based on quantity
// //   const subtotal = cartItems.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );
// //   const gst = subtotal * 0.18; // 18% GST
// //   const platformFee = 49; // Fixed fee as in Cart page
// //   const deliveryFee = subtotal > 5000 ? 0 : 99; // Free delivery above 5000
// //   const total = subtotal + gst + platformFee + deliveryFee;

// //   const handleProceedToPayment = () => {
// //     navigate("/payment", {
// //       state: {
// //         customerDetails,
// //         cartItems,
// //         paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
// //       },
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Date Display */}
// //         <div
// //           className="text-right mb-2 text-sm"
// //           style={{ fontSize: "16px", fontFamily: "Poppins" }}
// //         >
// //           {formattedDate}
// //         </div>

// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
// //           <h2 className="mt-2 text-xl font-semibold text-gray-600">
// //             Order Summary
// //           </h2>
// //           <p className="mt-1 text-gray-500">Review your order before payment</p>
// //         </div>

// //         {/* Customer Details Section */}
// //         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h3 className="text-lg font-medium text-gray-900">
// //               Customer Details
// //             </h3>
// //             <button
// //               onClick={() =>
// //                 navigate("/customerDetails", {
// //                   state: { customerDetails, cartItems: state?.cartItems },
// //                 })
// //               }
// //               className="text-sm text-indigo-600 hover:text-indigo-800"
// //             >
// //               Edit
// //             </button>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <p className="text-sm font-medium text-gray-500">Name</p>
// //               <p className="mt-1 text-sm text-gray-900">
// //                 {customerDetails.name}
// //               </p>
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-500">Mobile Number</p>
// //               <p className="mt-1 text-sm text-gray-900">
// //                 {customerDetails.mobile}
// //               </p>
// //             </div>
// //             <div className="md:col-span-2">
// //               <p className="text-sm font-medium text-gray-500">Address</p>
// //               <p className="mt-1 text-sm text-gray-900">
// //                 {customerDetails.address}, {customerDetails.city} -{" "}
// //                 {customerDetails.pincode}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Devices Section */}
// //         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //           <h3 className="text-lg font-medium text-gray-900 mb-4">
// //             Your Devices ({cartItems.length})
// //           </h3>

// //           {cartItems.length === 0 ? (
// //             <div className="text-center py-8">
// //               <p className="text-gray-500">No items in cart</p>
// //             </div>
// //           ) : (
// //             <div className="divide-y divide-gray-200">
// //               {cartItems.map((item) => (
// //                 <div key={item.id} className="py-4 flex flex-col sm:flex-row">
// //                   <div className="flex-shrink-0">
// //                     <img
// //                       className="h-20 w-20 rounded-md object-cover"
// //                       src={item.image}
// //                       alt={item.name}
// //                       onError={(e) => {
// //                         e.target.onerror = null;
// //                         e.target.src = "https://via.placeholder.com/80";
// //                       }}
// //                     />
// //                   </div>
// //                   <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
// //                     <div className="flex justify-between">
// //                       <div>
// //                         <h4 className="text-base font-medium text-gray-900">
// //                           {item.name}
// //                         </h4>
// //                         <p className="mt-1 text-sm text-gray-500">
// //                           {item.specs} • {item.color}
// //                         </p>
// //                       </div>
// //                       <p className="text-base font-medium text-gray-900">
// //                         <span className="text-gray-400">Price: </span>
// //                         <span>₹{item.price.toLocaleString("en-IN")}</span>
// //                       </p>
// //                     </div>
// //                     <div className="mt-2 flex justify-between items-center">
// //                       <div className="flex items-center">
// //                         <button
// //                           onClick={() => decreaseQuantity(item.id)}
// //                           className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
// //                           disabled={quantities[item.id] <= 1}
// //                         >
// //                           -
// //                         </button>
// //                         <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
// //                           {quantities[item.id] || item.quantity}
// //                         </span>
// //                         <button
// //                           onClick={() => increaseQuantity(item.id)}
// //                           className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
// //                         >
// //                           +
// //                         </button>
// //                       </div>
// //                       <p className="text-base font-medium text-gray-900">
// //                         <span className="text-gray-400">Total: </span>
// //                         <span>
// //                           ₹
// //                           {(
// //                             item.price * (quantities[item.id] || item.quantity)
// //                           ).toLocaleString("en-IN")}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Payment Summary Section */}
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h3 className="text-lg font-medium text-gray-900 mb-4">
// //             Payment Summary
// //           </h3>

// //           <div className="space-y-3">
// //             <div className="flex justify-between">
// //               <p className="text-sm text-gray-600">
// //                 Subtotal ({cartItems.length} items)
// //               </p>
// //               <p className="text-sm text-gray-900">
// //                 ₹{subtotal.toLocaleString("en-IN")}
// //               </p>
// //             </div>
// //             <div className="flex justify-between">
// //               <p className="text-sm text-gray-600">GST (18%)</p>
// //               <p className="text-sm text-gray-900">
// //                 ₹{gst.toLocaleString("en-IN")}
// //               </p>
// //             </div>
// //             <div className="flex justify-between">
// //               <p className="text-sm text-gray-600">Platform Fee</p>
// //               <p className="text-sm text-gray-900">
// //                 ₹{platformFee.toLocaleString("en-IN")}
// //               </p>
// //             </div>
// //             <div className="flex justify-between">
// //               <p className="text-sm text-gray-600">Delivery Fee</p>
// //               <p className="text-sm text-gray-900">
// //                 {deliveryFee === 0 ? (
// //                   <span className="text-green-600">Free</span>
// //                 ) : (
// //                   `₹${deliveryFee.toLocaleString("en-IN")}`
// //                 )}
// //               </p>
// //             </div>
// //             <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
// //               <p className="text-base font-medium text-gray-900">
// //                 Total Amount
// //               </p>
// //               <p className="text-base font-bold text-gray-900">
// //                 ₹{total.toLocaleString("en-IN")}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="mt-8">
// //             <button
// //               onClick={handleProceedToPayment}
// //               disabled={cartItems.length === 0}
// //               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
// //                 cartItems.length === 0
// //                   ? "bg-gray-400 cursor-not-allowed"
// //                   : "bg-indigo-600 hover:bg-indigo-700"
// //               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
// //             >
// //               {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Payment"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PurchasePreview;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const PurchasePreview = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const [quantities, setQuantities] = useState({});

//   // Restore state if lost
//   useEffect(() => {
//     if (!state) {
//       const savedState = sessionStorage.getItem("checkoutState");
//       if (savedState) {
//         navigate(".", { 
//           state: JSON.parse(savedState), 
//           replace: true 
//         });
//       } else {
//         navigate("/cart");
//       }
//     }
//   }, [state, navigate]);

//   // If still no state, show loading
//   if (!state) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   // Get current date and format it
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Initialize quantities from cartItems
//   useEffect(() => {
//     if (state?.cartItems) {
//       const initialQuantities = {};
//       state.cartItems.forEach((item) => {
//         initialQuantities[item.id] = item.quantity;
//       });
//       setQuantities(initialQuantities);
//     }
//   }, [state?.cartItems]);

//   const customerDetails = state?.customerDetails || {
//     name: "John Doe",
//     mobile: "9876543210",
//     address: "123 Tech Street",
//     city: "Bangalore",
//     pincode: "560001",
//   };

//   const parseIndianPrice = (priceInput) => {
//     if (typeof priceInput === "number") return priceInput;
//     if (typeof priceInput === "string") {
//       return parseFloat(priceInput.replace(/₹|,/g, "")) || 0;
//     }
//     return 0;
//   };

//   // Handle quantity changes
//   const increaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) - 1),
//     }));
//   };

//   // Create cartItems array with current quantities
//   const cartItems = (state?.cartItems || []).map((item) => ({
//     ...item,
//     quantity: quantities[item.id] || item.quantity,
//     price: parseIndianPrice(item.price),
//     name: item.name || "Unknown Device",
//     image: item.image || "https://via.placeholder.com/80",
//     specs: item.specs || "Unknown Category",
//     color: item.color || "Not specified",
//   }));

//   // Calculate totals based on quantity
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const gst = subtotal * 0.18;
//   const platformFee = 49;
//   const deliveryFee = subtotal > 5000 ? 0 : 99;
//   const total = subtotal + gst + platformFee + deliveryFee;

//   const handleProceedToPayment = () => {
//     navigate("/payment", {
//       state: {
//         customerDetails,
//         cartItems,
//         paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-right mb-2 text-sm" style={{ fontSize: "16px", fontFamily: "Poppins" }}>
//           {formattedDate}
//         </div>

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
//           <h2 className="mt-2 text-xl font-semibold text-gray-600">
//             Order Summary
//           </h2>
//           <p className="mt-1 text-gray-500">Review your order before payment</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium text-gray-900">
//               Customer Details
//             </h3>
//             <button
//               onClick={() =>
//                 navigate("/customerDetails", {
//                   state: { customerDetails, cartItems: state?.cartItems },
//                 })
//               }
//               className="text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               Edit
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Name</p>
//               <p className="mt-1 text-sm text-gray-900">
//                 {customerDetails.name}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Mobile Number</p>
//               <p className="mt-1 text-sm text-gray-900">
//                 {customerDetails.mobile}
//               </p>
//             </div>
//             <div className="md:col-span-2">
//               <p className="text-sm font-medium text-gray-500">Address</p>
//               <p className="mt-1 text-sm text-gray-900">
//                 {customerDetails.address}, {customerDetails.city} -{" "}
//                 {customerDetails.pincode}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">
//             Your Devices ({cartItems.length})
//           </h3>

//           {cartItems.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500">No items in cart</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="py-4 flex flex-col sm:flex-row">
//                   <div className="flex-shrink-0">
//                     <img
//                       className="h-20 w-20 rounded-md object-cover"
//                       src={item.image}
//                       alt={item.name}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://via.placeholder.com/80";
//                       }}
//                     />
//                   </div>
//                   <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
//                     <div className="flex justify-between">
//                       <div>
//                         <h4 className="text-base font-medium text-gray-900">
//                           {item.name}
//                         </h4>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {item.specs} • {item.color}
//                         </p>
//                       </div>
//                       <p className="text-base font-medium text-gray-900">
//                         <span className="text-gray-400">Price: </span>
//                         <span>₹{item.price.toLocaleString("en-IN")}</span>
//                       </p>
//                     </div>
//                     <div className="mt-2 flex justify-between items-center">
//                       <div className="flex items-center">
//                         <button
//                           onClick={() => decreaseQuantity(item.id)}
//                           className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
//                           disabled={quantities[item.id] <= 1}
//                         >
//                           -
//                         </button>
//                         <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
//                           {quantities[item.id] || item.quantity}
//                         </span>
//                         <button
//                           onClick={() => increaseQuantity(item.id)}
//                           className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <p className="text-base font-medium text-gray-900">
//                         <span className="text-gray-400">Total: </span>
//                         <span>
//                           ₹
//                           {(
//                             item.price * (quantities[item.id] || item.quantity)
//                           ).toLocaleString("en-IN")}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">
//             Payment Summary
//           </h3>

//           <div className="space-y-3">
//             <div className="flex justify-between">
//               <p className="text-sm text-gray-600">
//                 Subtotal ({cartItems.length} items)
//               </p>
//               <p className="text-sm text-gray-900">
//                 ₹{subtotal.toLocaleString("en-IN")}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <p className="text-sm text-gray-600">GST (18%)</p>
//               <p className="text-sm text-gray-900">
//                 ₹{gst.toLocaleString("en-IN")}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <p className="text-sm text-gray-600">Platform Fee</p>
//               <p className="text-sm text-gray-900">
//                 ₹{platformFee.toLocaleString("en-IN")}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <p className="text-sm text-gray-600">Delivery Fee</p>
//               <p className="text-sm text-gray-900">
//                 {deliveryFee === 0 ? (
//                   <span className="text-green-600">Free</span>
//                 ) : (
//                   `₹${deliveryFee.toLocaleString("en-IN")}`
//                 )}
//               </p>
//             </div>
//             <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
//               <p className="text-base font-medium text-gray-900">
//                 Total Amount
//               </p>
//               <p className="text-base font-bold text-gray-900">
//                 ₹{total.toLocaleString("en-IN")}
//               </p>
//             </div>
//           </div>

//           <div className="mt-8">
//             <button
//               onClick={handleProceedToPayment}
//               disabled={cartItems.length === 0}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                 cartItems.length === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//             >
//               {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Payment"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchasePreview;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PurchasePreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [quantities, setQuantities] = useState({});
  const [isDirectPurchase, setIsDirectPurchase] = useState(false);

  // Restore state if lost
  useEffect(() => {
    if (!state) {
      const savedState = sessionStorage.getItem("checkoutState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        navigate(".", { 
          state: parsedState, 
          replace: true 
        });
        setIsDirectPurchase(!parsedState.cartItems);
      } else {
        navigate("/");
      }
    } else {
      setIsDirectPurchase(!state.cartItems && !!state.device);
    }
  }, [state, navigate]);

  // If still no state, show loading
  if (!state) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Get current date and format it
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Initialize quantities
  useEffect(() => {
    if (isDirectPurchase) {
      setQuantities({ [state.device.id]: state.quantity || 1 });
    } else if (state?.cartItems) {
      const initialQuantities = {};
      state.cartItems.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [state, isDirectPurchase]);

  const customerDetails = state?.customerDetails || {
    name: "John Doe",
    mobile: "9876543210",
    address: "123 Tech Street",
    city: "Bangalore",
    pincode: "560001",
  };

  const parseIndianPrice = (priceInput) => {
    if (typeof priceInput === "number") return priceInput;
    if (typeof priceInput === "string") {
      return parseFloat(priceInput.replace(/₹|,/g, "")) || 0;
    }
    return 0;
  };

  // Handle quantity changes
  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  // Prepare items for display and calculation
  const getPurchaseItems = () => {
    if (isDirectPurchase) {
      const device = state.device;
      return [
        {
          id: device.id,
          name: device.generalInfo?.brandModel || "Unknown Device",
          image: device.deviceImage || "https://via.placeholder.com/80",
          price: parseIndianPrice(device.generalInfo?.price || 0),
          quantity: quantities[device.id] || state.quantity || 1,
          specs: device.category || "Unknown Category",
          color: device.buildDesign?.colorAvailable || "Not specified",
        }
      ];
    } else {
      return (state?.cartItems || []).map((item) => ({
        ...item,
        quantity: quantities[item.id] || item.quantity,
        price: parseIndianPrice(item.price),
        name: item.name || "Unknown Device",
        image: item.image || "https://via.placeholder.com/80",
        specs: item.specs || "Unknown Category",
        color: item.color || "Not specified",
      }));
    }
  };

  const purchaseItems = getPurchaseItems();

  // Calculate totals
  const subtotal = purchaseItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.18;
  const platformFee = 49;
  const deliveryFee = subtotal > 5000 ? 0 : 99;
  const total = subtotal + gst + platformFee + deliveryFee;

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        customerDetails,
        cartItems: purchaseItems,
        paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
        ...(isDirectPurchase && { device: state.device }), // Include device for direct purchases
      },
    });
  };

  const handleEditDevice = () => {
    if (isDirectPurchase) {
      navigate(`/devices/${state.device.id}`, { 
        state: { fromPreview: true, quantity: quantities[state.device.id] || 1 }
      });
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-right mb-2 text-sm" style={{ fontSize: "16px", fontFamily: "Poppins" }}>
          {formattedDate}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-600">
            Order Summary
          </h2>
          <p className="mt-1 text-gray-500">Review your order before payment</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Customer Details
            </h3>
            <button
              onClick={() =>
                navigate("/customerDetails", {
                  state: { 
                    customerDetails, 
                    ...(isDirectPurchase 
                      ? { device: state.device, quantity: quantities[state.device.id] || 1 }
                      : { cartItems: state?.cartItems }
                    )
                  },
                })
              }
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1 text-sm text-gray-900">
                {customerDetails.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Mobile Number</p>
              <p className="mt-1 text-sm text-gray-900">
                {customerDetails.mobile}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="mt-1 text-sm text-gray-900">
                {customerDetails.address}, {customerDetails.city} -{" "}
                {customerDetails.pincode}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {isDirectPurchase ? "Your Device" : `Your Devices (${purchaseItems.length})`}
            </h3>
            <button
              onClick={handleEditDevice}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {isDirectPurchase ? "Change Device" : "Edit Cart"}
            </button>
          </div>

          {purchaseItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No items in cart</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {purchaseItems.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-md object-cover"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                  </div>
                  <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.specs} • {item.color}
                        </p>
                      </div>
                      <p className="text-base font-medium text-gray-900">
                        <span className="text-gray-400">Price: </span>
                        <span>₹{item.price.toLocaleString("en-IN")}</span>
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                          disabled={quantities[item.id] <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
                          {quantities[item.id] || item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-base font-medium text-gray-900">
                        <span className="text-gray-400">Total: </span>
                        <span>
                          ₹
                          {(
                            item.price * (quantities[item.id] || item.quantity)
                          ).toLocaleString("en-IN")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">
                Subtotal ({purchaseItems.length} {purchaseItems.length === 1 ? "item" : "items"})
              </p>
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

          <div className="mt-8">
            <button
              onClick={handleProceedToPayment}
              disabled={purchaseItems.length === 0}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                purchaseItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {purchaseItems.length === 0 ? "No Items Selected" : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePreview;