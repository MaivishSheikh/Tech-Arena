// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import QRCode from "react-qr-code";
// // import { toast } from "react-toastify";

// // const PaymentPage = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { 
// //     customerDetails, 
// //     cartItems, 
// //     paymentSummary: { subtotal, gst, platformFee, deliveryFee, total } 
// //   } = location.state;

// //   const [showQRCode, setShowQRCode] = useState(false);
// //   const [paymentMethod, setPaymentMethod] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

// //   // UPI Payment Details
// //   const upiId = "yourupi@upi";
// //   const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${total}&cu=INR`;

// //   // Load Razorpay script
// //   useEffect(() => {
// //     const loadRazorpay = () => {
// //       const script = document.createElement('script');
// //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //       script.onload = () => setRazorpayLoaded(true);
// //       script.onerror = () => console.error('Razorpay SDK failed to load');
// //       document.body.appendChild(script);
// //     };

// //     loadRazorpay();
// //   }, []);

// //   const handlePayment = async (method) => {
// //     setIsProcessing(true);
// //     setPaymentMethod(method);
    
// //     try {
// //       if (method === 'razorpay') {
// //         await handleRazorpayPayment();
// //       } else {
// //         // Simulate processing for other methods
// //         await new Promise(resolve => setTimeout(resolve, 1500));
// //         navigateToConfirmation(method);
// //       }
// //     } catch (error) {
// //       toast.error(error.message || "Payment failed", {
// //         position: "top-center",
// //         autoClose: 3000,
// //       });
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const handleRazorpayPayment = async () => {
// //     try {
// //       if (!razorpayLoaded) {
// //         throw new Error('Payment system is still loading. Please try again in a moment.');
// //       }
  
// //       const token = localStorage.getItem("accessToken");
// //       if (!token) {
// //         navigate("/login", {
// //           state: { from: location.pathname } // Return to current page after login
// //         });
// //         return;
// //       }
  
// //       // Get device ID from cart items (assuming first item is the device)
// //       const deviceId = cartItems[0]?.device?._id;
// //       if (!deviceId) {
// //         throw new Error('No device found in cart');
// //       }
  
// //       setIsProcessing(true);
// //       setPaymentMethod('razorpay');
  
// //       // Step 1: Create order via backend API
// //       const createOrderResponse = await fetch(
// //         "http://localhost:8000/api/v1/payments/create-order", 
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify({
// //             amount: total,
// //             currency: "INR",
// //             deviceId: deviceId // Include device ID in the request
// //           }),
// //         }
// //       );
  
// //       const responseData = await createOrderResponse.json();
  
// //       if (!createOrderResponse.ok) {
// //         throw new Error(
// //           responseData.message || 
// //           `Payment order creation failed (${createOrderResponse.status})`
// //         );
// //       }
  
// //       const order = responseData.data;
  
// //       // Step 2: Initialize Razorpay checkout
// //       const options = {
// //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
// //         amount: order.amount,
// //         currency: order.currency,
// //         order_id: order.id,
// //         name: "Your Store",
// //         description: `Payment for ${cartItems[0]?.device?.generalInfo?.brandModel || 'your order'}`,
// //         image: "/logo.png", // Add your store logo
// //         handler: async (response) => {
// //           try {
// //             // Step 3: Verify payment via backend API
// //             const verifyResponse = await fetch(
// //               "http://localhost:8000/api/v1/payments/verify",
// //               {
// //                 method: "POST",
// //                 headers: {
// //                   "Content-Type": "application/json",
// //                   Authorization: `Bearer ${token}`,
// //                 },
// //                 body: JSON.stringify({
// //                   ...response,
// //                   deviceId: deviceId // Include device ID in verification
// //                 }),
// //               }
// //             );
  
// //             const verifyData = await verifyResponse.json();
  
// //             if (!verifyResponse.ok) {
// //               throw new Error(
// //                 verifyData.message || 
// //                 `Payment verification failed (${verifyResponse.status})`
// //               );
// //             }
  
// //             // Payment successful
// //             navigateToConfirmation('razorpay', response.razorpay_payment_id);
// //           } catch (verifyError) {
// //             toast.error(verifyError.message, {
// //               position: "top-center",
// //               autoClose: 5000,
// //             });
// //           }
// //         },
// //         prefill: {
// //           name: customerDetails.name,
// //           email: customerDetails.email || '',
// //           contact: customerDetails.phone
// //         },
// //         notes: {
// //           address: customerDetails.address,
// //           orderType: "device_purchase"
// //         },
// //         theme: {
// //           color: "#3399cc"
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             toast.info("Payment window closed", { position: "top-center" });
// //             setIsProcessing(false);
// //           }
// //         }
// //       };
  
// //       const rzp = new window.Razorpay(options);
// //       rzp.on('payment.failed', (response) => {
// //         toast.error(`Payment failed: ${response.error.description}`, {
// //           position: "top-center",
// //           autoClose: 5000,
// //         });
// //       });
// //       rzp.open();
  
// //     } catch (error) {
// //       console.error("Payment error:", error);
// //       toast.error(error.message, {
// //         position: "top-center",
// //         autoClose: 5000,
// //       });
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const navigateToConfirmation = (method, paymentId = null) => {
// //     navigate("/order-confirmation", {
// //       state: {
// //         customerDetails,
// //         cartItems,
// //         paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
// //         paymentMethod: method,
// //         paymentId
// //       }
// //     });
// //   };

// //   return (
// //     <div className="p-4 max-w-md mx-auto">
// //       <h1 className="text-2xl font-bold mb-4">Payment</h1>
      
// //       {/* Order Summary */}
// //       <div className="mb-6 bg-gray-50 p-4 rounded-lg">
// //         <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
// //         <div className="space-y-1">
// //           <div className="flex justify-between">
// //             <span>Subtotal:</span>
// //             <span>₹{subtotal.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between">
// //             <span>GST (18%):</span>
// //             <span>₹{gst.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between">
// //             <span>Platform Fee:</span>
// //             <span>₹{platformFee.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between">
// //             <span>Delivery Fee:</span>
// //             <span>₹{deliveryFee.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between font-bold border-t pt-2 mt-2">
// //             <span>Total:</span>
// //             <span>₹{total.toFixed(2)}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

// //       {/* Razorpay Payment Option */}
// //       <div className="mb-4">
// //         <button
// //           className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'razorpay' ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
// //           onClick={() => handlePayment('razorpay')}
// //           disabled={isProcessing || !razorpayLoaded}
// //         >
// //           {isProcessing && paymentMethod === 'razorpay' 
// //             ? 'Processing...' 
// //             : razorpayLoaded 
// //               ? 'Credit/Debit Card, UPI, NetBanking' 
// //               : 'Loading payment options...'}
// //         </button>
// //       </div>

// //       {/* Cash on Delivery Option */}
// //       <div className="mb-4">
// //         <button
// //           className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'cod' ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
// //           onClick={() => handlePayment('cod')}
// //           disabled={isProcessing}
// //         >
// //           {isProcessing && paymentMethod === 'cod' ? 'Processing...' : 'Cash on Delivery'}
// //         </button>
// //       </div>

// //       {/* QR Code Payment Option */}
// //       <div className="mb-4">
// //         <button
// //           className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
// //           onClick={() => setShowQRCode(!showQRCode)}
// //           disabled={isProcessing}
// //         >
// //           UPI QR Code Payment
// //         </button>

// //         {/* QR Code Dropdown */}
// //         {showQRCode && (
// //           <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
// //             <h2 className="text-xl font-semibold mb-2">Scan to Pay ₹{total.toFixed(2)}</h2>
// //             <QRCode value={upiLink} size={200} />
// //             <p className="mt-2 text-sm text-gray-600 mb-4">Scan with any UPI app</p>
// //             <button
// //               className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
// //               onClick={() => handlePayment('upi')}
// //               disabled={isProcessing}
// //             >
// //               {isProcessing && paymentMethod === 'upi' ? 'Processing...' : 'I have made the payment'}
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Customer Details */}
// //       <div className="mt-6 pt-4 border-t">
// //         <h2 className="text-lg font-semibold mb-2">Delivery To</h2>
// //         <p>{customerDetails.name}</p>
// //         <p>{customerDetails.address}</p>
// //         <p>{customerDetails.phone}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import QRCode from "react-qr-code";
// import { toast } from "react-toastify";

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { 
//     customerDetails, 
//     paymentSummary: { subtotal, gst, platformFee, deliveryFee, total } 
//   } = location.state || {};

//   const [showQRCode, setShowQRCode] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   // UPI Payment Details
//   const upiId = "yourupi@upi";
//   const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${total}&cu=INR`;

//   // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpay = () => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => setRazorpayLoaded(true);
//       script.onerror = () => console.error('Razorpay SDK failed to load');
//       document.body.appendChild(script);
//     };

//     loadRazorpay();
//   }, []);

//   const handlePayment = async (method) => {
//     setIsProcessing(true);
//     setPaymentMethod(method);
    
//     try {
//       if (method === 'razorpay') {
//         await handleRazorpayPayment();
//       } else {
//         // Simulate processing for other methods
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         navigateToConfirmation(method);
//       }
//     } catch (error) {
//       toast.error(error.message || "Payment failed", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleRazorpayPayment = async () => {
//     try {
//       if (!razorpayLoaded) {
//         throw new Error('Payment system is still loading. Please try again in a moment.');
//       }
  
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         navigate("/login", {
//           state: { from: location.pathname }
//         });
//         return;
//       }
  
//       // Prepare request body
//       const requestBody = {
//         amount: total,
//         currency: "INR"
//       };
      
//       // Step 1: Create order via backend API
//       const createOrderResponse = await fetch(
//         "http://localhost:8000/api/v1/payments/create-order", 
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );
  
//       const responseData = await createOrderResponse.json();
  
//       if (!createOrderResponse.ok) {
//         throw new Error(
//           responseData.message || 
//           `Payment order creation failed (${createOrderResponse.status})`
//         );
//       }
  
//       const order = responseData.data;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         name: "Your Store",
//         description: `Payment for ${productDescription}`,
//         image: "/logo.png",
//         handler: async (response) => {
//           try {
//             // Step 3: Verify payment via backend API
//             const verifyBody = {
//               ...response,
//             };
            
//             const verifyResponse = await fetch(
//               "http://localhost:8000/api/v1/payments/verify",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(verifyBody),
//               }
//             );
  
//             const verifyData = await verifyResponse.json();
  
//             if (!verifyResponse.ok) {
//               throw new Error(
//                 verifyData.message || 
//                 `Payment verification failed (${verifyResponse.status})`
//               );
//             }
  
//             // Payment successful
//             navigateToConfirmation('razorpay', response.razorpay_payment_id);
//           } catch (verifyError) {
//             toast.error(verifyError.message, {
//               position: "top-center",
//               autoClose: 5000,
//             });
//           }
//         },
//         prefill: {
//           name: customerDetails.name,
//           email: customerDetails.email || '',
//           contact: customerDetails.phone
//         },
//         notes: {
//           address: customerDetails.address,
//           orderType: isCartPurchase ? "cart_purchase" : "direct_device_purchase"
//         },
//         theme: {
//           color: "#3399cc"
//         },
//         modal: {
//           ondismiss: () => {
//             toast.info("Payment window closed", { position: "top-center" });
//             setIsProcessing(false);
//           }
//         }
//       };
  
//       const rzp = new window.Razorpay(options);
//       rzp.on('payment.failed', (response) => {
//         toast.error(`Payment failed: ${response.error.description}`, {
//           position: "top-center",
//           autoClose: 5000,
//         });
//       });
//       rzp.open();
  
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(error.message, {
//         position: "top-center",
//         autoClose: 5000,
//       });
//       throw error;
//     }
//   };

//   const navigateToConfirmation = (method, paymentId = null) => {
//     navigate("/order-confirmation", {
//       state: {
//         customerDetails,
//         paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
//         paymentMethod: method,
//         paymentId
//       }
//     });
//   };

//   // Render product information based on purchase type
//   const renderProductInfo = () => {
//     if (cartItems && cartItems.length > 0) {
//       return (
//         <div className="mb-4">
//           <h3 className="font-medium">Purchasing {cartItems.length} item(s) from cart</h3>
//           {cartItems.map((item, index) => (
//             <div key={index} className="flex justify-between mt-2">
//               <span>{item.device?.generalInfo?.brandModel || `Item ${index + 1}`}</span>
//               <span>₹{item.device?.generalInfo?.price || '0.00'}</span>
//             </div>
//           ))}
//         </div>
//       );
//     } else if (device) {
//       return (
//         <div className="mb-4">
//           <h3 className="font-medium">Purchasing Device</h3>
//           <div className="flex justify-between mt-2">
//             <span>{device.generalInfo?.brandModel || 'Device'}</span>
//             <span>₹{device.generalInfo?.price || '0.00'}</span>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Payment</h1>
      
//       {/* Product Information */}
//       {renderProductInfo()}

//       {/* Order Summary */}
//       <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//         <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
//         <div className="space-y-1">
//           <div className="flex justify-between">
//             <span>Subtotal:</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>GST (18%):</span>
//             <span>₹{gst.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Platform Fee:</span>
//             <span>₹{platformFee.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Delivery Fee:</span>
//             <span>₹{deliveryFee.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between font-bold border-t pt-2 mt-2">
//             <span>Total:</span>
//             <span>₹{total.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>

//       <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

//       {/* Razorpay Payment Option */}
//       <div className="mb-4">
//         <button
//           className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'razorpay' ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
//           onClick={() => handlePayment('razorpay')}
//           disabled={isProcessing || !razorpayLoaded}
//         >
//           {isProcessing && paymentMethod === 'razorpay' 
//             ? 'Processing...' 
//             : razorpayLoaded 
//               ? 'Credit/Debit Card, UPI, NetBanking' 
//               : 'Loading payment options...'}
//         </button>
//       </div>

//       {/* Cash on Delivery Option */}
//       <div className="mb-4">
//         <button
//           className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'cod' ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
//           onClick={() => handlePayment('cod')}
//           disabled={isProcessing}
//         >
//           {isProcessing && paymentMethod === 'cod' ? 'Processing...' : 'Cash on Delivery'}
//         </button>
//       </div>

//       {/* QR Code Payment Option */}
//       <div className="mb-4">
//         <button
//           className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//           onClick={() => setShowQRCode(!showQRCode)}
//           disabled={isProcessing}
//         >
//           UPI QR Code Payment
//         </button>

//         {showQRCode && (
//           <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
//             <h2 className="text-xl font-semibold mb-2">Scan to Pay ₹{total.toFixed(2)}</h2>
//             <QRCode value={upiLink} size={200} />
//             <p className="mt-2 text-sm text-gray-600 mb-4">Scan with any UPI app</p>
//             <button
//               className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//               onClick={() => handlePayment('upi')}
//               disabled={isProcessing}
//             >
//               {isProcessing && paymentMethod === 'upi' ? 'Processing...' : 'I have made the payment'}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Customer Details */}
//       <div className="mt-6 pt-4 border-t">
//         <h2 className="text-lg font-semibold mb-2">Delivery To</h2>
//         <p>{customerDetails?.name}</p>
//         <p>{customerDetails?.address}</p>
//         <p>{customerDetails?.phone}</p>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    customerDetails, 
    paymentSummary: { subtotal, gst, platformFee, deliveryFee, total } 
  } = location.state || {};

  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // UPI Payment Details
  const upiId = "yourupi@upi";
  const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${total}&cu=INR`;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error('Razorpay SDK failed to load');
      toast.error('Failed to load payment system. Please refresh the page.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (method) => {
    setIsProcessing(true);
    setPaymentMethod(method);
    
    try {
      if (method === 'razorpay') {
        await handleRazorpayPayment();
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigateToConfirmation(method);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // const handleRazorpayPayment = async () => {
  //   try {
  //     if (!razorpayLoaded) {
  //       throw new Error('Payment system is still loading. Please try again.');
  //     }

  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       navigate("/login", { state: { from: location.pathname } });
  //       return;
  //     }

  //     // 1. Create Razorpay order
  //     const order = await createRazorpayOrder(token);

  //     // 2. Initialize Razorpay payment
  //     const rzp = new window.Razorpay({
  //       key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: order.currency,
  //       order_id: order.id,
  //       name: "Your Store",
  //       description: "Order Payment",
  //       image: "/logo.png",
  //       handler: async (response) => {
  //         try {
  //           await verifyRazorpayPayment(token, response);
  //           navigateToConfirmation('razorpay', response.razorpay_payment_id);
  //         } catch (error) {
  //           toast.error(error.message || "Payment verification failed", {
  //             position: "top-center",
  //             autoClose: 5000,
  //           });
  //         }
  //       },
  //       prefill: {
  //         name: customerDetails?.name || '',
  //         email: customerDetails?.email || '',
  //         contact: customerDetails?.phone || ''
  //       },
  //       theme: { color: "#3399cc" },
  //       modal: {
  //         ondismiss: () => {
  //           toast.info("Payment window closed", { position: "top-center" });
  //         }
  //       }
  //     });

  //     rzp.on('payment.failed', (response) => {
  //       toast.error(`Payment failed: ${response.error.description}`, {
  //         position: "top-center",
  //         autoClose: 5000,
  //       });
  //     });

  //     rzp.open();

  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const handleRazorpayPayment = async () => {
  //   try {
  //     if (!razorpayLoaded) {
  //       throw new Error('Payment system is still loading. Please try again.');
  //     }
  
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       navigate("/login", { state: { from: location.pathname } });
  //       return;
  //     }
  
  //     // Use the environment variable from your build system
  //     const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 
  //                        process.env.REACT_APP_RAZORPAY_KEY_ID;
      
  //     if (!razorpayKey) {
  //       throw new Error('Payment gateway configuration error - missing key');
  //     }
  
  //     // Create order
  //     const order = await createRazorpayOrder(token);
  
  //     // Initialize Razorpay
  //     const rzp = new window.Razorpay({
  //       key: razorpayKey, // Use the key here
  //       amount: order.amount,
  //       currency: order.currency,
  //       order_id: order.id,
  //       name: "TechArena",
  //       description: "Order Payment",
  //       image: "/logo.png",
  //       handler: async (response) => {
  //         try {
  //           await verifyRazorpayPayment(token, response);
  //           navigateToConfirmation('razorpay', response.razorpay_payment_id);
  //         } catch (error) {
  //           toast.error(error.message || "Payment verification failed", {
  //             position: "top-center",
  //             autoClose: 5000,
  //           });
  //         }
  //       },
  //       prefill: {
  //         name: customerDetails?.name || '',
  //         email: customerDetails?.email || '',
  //         contact: customerDetails?.phone || ''
  //       },
  //       theme: { color: "#3399cc" }
  //     });
  
  //     rzp.on('payment.failed', (response) => {
  //       toast.error(`Payment failed: ${response.error.description}`, {
  //         position: "top-center",
  //         autoClose: 5000,
  //       });
  //     });
  
  //     rzp.open();
  //   } catch (error) {
  //     toast.error(error.message || "Payment processing failed", {
  //       position: "top-center",
  //       autoClose: 5000,
  //     });
  //   }
  // };

  // const createRazorpayOrder = async (token) => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/v1/payments/create-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         amount: total,
  //         currency: "INR"
  //         // Removed device field
  //       }),
  //     });
  
  //     const responseText = await response.text();
      
  //     if (!response.ok) {
  //       try {
  //         const errorData = JSON.parse(responseText);
  //         throw new Error(errorData.message || 'Failed to create payment order');
  //       } catch {
  //         throw new Error(responseText || 'Failed to create payment order');
  //       }
  //     }
  
  //     return JSON.parse(responseText).data;
  //   } catch (error) {
  //     console.error("Order creation error:", error);
  //     throw new Error(error.message || "Failed to create payment order");
  //   }
  // };

  const handleRazorpayPayment = async () => {
    try {
      if (!razorpayLoaded) {
        throw new Error('Payment system is still loading. Please try again.');
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      // 1. Create order via backend API
      const order = await createRazorpayOrder(token);

      // 2. Initialize Razorpay payment
      const rzp = new window.Razorpay({
        key: order.key || import.meta.env.VITE_RAZORPAY_KEY_ID, // Key from backend or fallback to frontend
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "TechArena",
        description: "Order Payment",
        image: "/logo.png",
        handler: async (response) => {
          try {
            await verifyRazorpayPayment(token, response);
            navigateToConfirmation('razorpay', response.razorpay_payment_id);
          } catch (error) {
            toast.error(error.message || "Payment verification failed", {
              position: "top-center",
              autoClose: 5000,
            });
          }
        },
        prefill: {
          name: customerDetails?.name || '',
          email: customerDetails?.email || '',
          contact: customerDetails?.phone || ''
        },
        theme: { color: "#3399cc" }
      });

      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`, {
          position: "top-center",
          autoClose: 5000,
        });
      });

      rzp.open();
    } catch (error) {
      toast.error(error.message || "Payment processing failed", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const createRazorpayOrder = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR"
        }),
      });

      const responseText = await response.text();
      
      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.message || 'Failed to create payment order');
        } catch {
          throw new Error(responseText || 'Failed to create payment order');
        }
      }

      return JSON.parse(responseText).data;
    } catch (error) {
      console.error("Order creation error:", error);
      throw new Error(error.message || "Failed to create payment order");
    }
  };

  const verifyRazorpayPayment = async (token, paymentResponse) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(paymentResponse),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error("Verification error:", error);
      throw new Error(error.message || "Payment verification failed");
    }
  };

  const navigateToConfirmation = (method, paymentId = null) => {
    navigate("/order-confirmation", {
      state: {
        customerDetails,
        paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
        paymentMethod: method,
        paymentId
      }
    });
  };

  if (!location.state) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <p className="text-red-500">No order information found. Please start your order again.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      
      {/* Order Summary */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>₹{platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

      {/* Razorpay Payment Option */}
      <div className="mb-4">
        <button
          className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'razorpay' ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
          onClick={() => handlePayment('razorpay')}
          disabled={isProcessing || !razorpayLoaded}
        >
          {isProcessing && paymentMethod === 'razorpay' 
            ? 'Processing...' 
            : razorpayLoaded 
              ? 'Credit/Debit Card, UPI, NetBanking' 
              : 'Loading payment options...'}
        </button>
      </div>

      {/* Cash on Delivery Option */}
      <div className="mb-4">
        <button
          className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'cod' ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
          onClick={() => handlePayment('cod')}
          disabled={isProcessing}
        >
          {isProcessing && paymentMethod === 'cod' ? 'Processing...' : 'Cash on Delivery'}
        </button>
      </div>

      {/* QR Code Payment Option */}
      <div className="mb-4">
        <button
          className={`w-full py-2 rounded-md transition-colors ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          onClick={() => setShowQRCode(!showQRCode)}
          disabled={isProcessing}
        >
          UPI QR Code Payment
        </button>

        {showQRCode && (
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Scan to Pay ₹{total.toFixed(2)}</h2>
            <QRCode value={upiLink} size={200} />
            <p className="mt-2 text-sm text-gray-600 mb-4">Scan with any UPI app</p>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => handlePayment('upi')}
              disabled={isProcessing}
            >
              {isProcessing && paymentMethod === 'upi' ? 'Processing...' : 'I have made the payment'}
            </button>
          </div>
        )}
      </div>

      {/* Customer Details */}
      <div className="mt-6 pt-4 border-t">
        <h2 className="text-lg font-semibold mb-2">Delivery To</h2>
        <p>{customerDetails?.name}</p>
        <p>{customerDetails?.address}</p>
        <p>{customerDetails?.phone}</p>
      </div>
    </div>
  );
};

export default PaymentPage;