import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

const PaymentPage = () => {
  const location = useLocation();
  const { total } = location.state; // Get the total amount from the bill page

  const [showQRCode, setShowQRCode] = useState(false);

  // UPI Payment Details
  const upiId = "yourupi@upi"; // Replace with your UPI ID
  const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${total}&cu=INR`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>

      {/* Cash on Delivery Option */}
      <div className="mb-6">
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={() => alert("Order placed successfully! You will pay on delivery.")}
        >
          Cash on Delivery
        </button>
      </div>

      {/* QR Code Payment Option */}
      <div className="mb-6">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setShowQRCode(!showQRCode)}
        >
          Pay via QR Code
        </button>

        {/* QR Code Dropdown */}
        {showQRCode && (
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Scan to Pay ₹{total.toFixed(2)}</h2>
            <QRCode value={upiLink} size={200} />
            <p className="mt-2 text-sm text-gray-600">Scan with any UPI app</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;