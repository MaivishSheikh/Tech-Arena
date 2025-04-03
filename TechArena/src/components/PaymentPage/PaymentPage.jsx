// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import QRCode from "react-qr-code";

// const PaymentPage = () => {
//   const location = useLocation();
//   const { total } = location.state; // Get the total amount from the bill page

//   const [showQRCode, setShowQRCode] = useState(false);

//   // UPI Payment Details
//   const upiId = "yourupi@upi"; // Replace with your UPI ID
//   const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${total}&cu=INR`;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>

//       {/* Cash on Delivery Option */}
//       <div className="mb-6">
//         <button
//           className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
//           onClick={() => alert("Order placed successfully! You will pay on delivery.")}
//         >
//           Cash on Delivery
//         </button>
//       </div>

//       {/* QR Code Payment Option */}
//       <div className="mb-6">
//         <button
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//           onClick={() => setShowQRCode(!showQRCode)}
//         >
//           Pay via QR Code
//         </button>

//         {/* QR Code Dropdown */}
//         {showQRCode && (
//           <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
//             <h2 className="text-xl font-semibold mb-2">Scan to Pay ₹{total.toFixed(2)}</h2>
//             <QRCode value={upiLink} size={200} />
//             <p className="mt-2 text-sm text-gray-600">Scan with any UPI app</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    customerDetails, 
    cartItems, 
    paymentSummary: { subtotal, gst, platformFee, deliveryFee, total } 
  } = location.state;

  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // UPI Payment Details
  const upiId = "yourupi@upi"; // Replace with your UPI ID
  const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${total}&cu=INR`;

  const handlePayment = (method) => {
    setIsProcessing(true);
    setPaymentMethod(method);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/order-confirmation", {
        state: {
          customerDetails,
          cartItems,
          paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
          paymentMethod: method
        }
      });
    }, 1500);
  };

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
          UPI Payment
        </button>

        {/* QR Code Dropdown */}
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

      {/* Customer Details (for reference) */}
      <div className="mt-6 pt-4 border-t">
        <h2 className="text-lg font-semibold mb-2">Delivery To</h2>
        <p>{customerDetails.name}</p>
        <p>{customerDetails.address}</p>
        <p>{customerDetails.phone}</p>
      </div>
    </div>
  );
};

export default PaymentPage;