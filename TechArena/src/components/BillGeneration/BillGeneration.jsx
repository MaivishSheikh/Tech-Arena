import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BillGeneration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { variant, customerDetails } = location.state;

  const platformFee = 50;
  const deliveryFee = 100;
  const gst = 18;
  const variantPrice = parseFloat(variant.price);

  const total = variantPrice + platformFee + deliveryFee + gst;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Customer Details:</h2>
          <p>Name: {customerDetails.name}</p>
          <p>Address: {customerDetails.address}</p>
          <p>Mobile: {customerDetails.mobile}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Variant Details:</h2>
          <p>Device: {variant.deviceName}</p>
          <p>RAM: {variant.memory}</p>
          <p>Storage: {variant.storage}</p>
          <p>Color: {variant.colorAvailable}</p>
          <p>Price: ₹{variantPrice.toFixed(2)}</p>
          {/* <p>Quantity: <input type="number" name="" placeholder="Quantity" id="" className="w-14 border-2 border-black" /></p> */}
        </div>
        <div>
          <h2 className="text-xl font-semibold">Payment Details:</h2>
          <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
          <p>Delivery Fee: ₹{deliveryFee.toFixed(2)}</p>
          <p>GST: ₹{gst.toFixed(2)}</p>
          <p className="font-bold">Total: ₹{total.toFixed(2)}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => navigate("/payment", { state: { total } })}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BillGeneration;