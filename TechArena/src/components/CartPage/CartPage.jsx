import React, { useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Classic Bike Jacket", price: 2999, quantity: 1 },
    { id: 2, name: "Riding Gloves", price: 999, quantity: 1 }
  ]);


  const handleCheckout = () => {
    window.location.href = "/order-summary"; // Redirect to order summary page
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between py-2 border-b">
            <span>{item.name} (x{item.quantity})</span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold mt-4">Total: ₹{totalAmount}</p>
      <button
        onClick={handleCheckout}
        className="block text-center bg-blue-500 text-white mt-4 p-2 rounded-lg w-full"
      >
        Proceed to Summary
      </button>
    </div>
  );
};

export default CartPage;