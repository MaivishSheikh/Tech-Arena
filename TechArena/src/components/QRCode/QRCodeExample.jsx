import React from "react";
// import QRCode from "qrcode.react";
import QRCode from "react-qr-code";

const QRCodeExample = () => {
  const upiId = "yourupi@upi"; // Replace with your UPI ID
  const amount = 999; // Fixed Amount

  // Generate UPI Payment URL
  const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Scan to Pay ₹999</h1>

      <div className="p-4 bg-white shadow-md rounded">
        <QRCode value={upiLink} size={200} />
        <p className="mt-2 text-sm text-gray-600">Scan with any UPI app</p>
      </div>
    </div>
  );
};

export default QRCodeExample;