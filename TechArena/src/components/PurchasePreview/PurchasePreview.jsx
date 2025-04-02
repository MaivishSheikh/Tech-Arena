import { useLocation, useNavigate } from "react-router-dom";

const PurchasePreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const customerDetails = state?.customerDetails || {
    name: "John Doe",
    mobile: "9876543210",
    address: "123 Tech Street",
    city: "Bangalore",
    pincode: "560001",
  };

  const cartItems = state?.cartItems || [
    {
      id: 1,
      name: "Smartphone X Pro",
      image: "https://via.placeholder.com/80",
      price: 54999,
      quantity: 1,
      specs: "8GB RAM, 128GB Storage",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      image: "https://via.placeholder.com/80",
      price: 2999,
      quantity: 2,
      specs: "Bluetooth 5.0, 20hrs battery",
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.18; // 18% GST
  const platformFee = 49;
  const deliveryFee = subtotal > 5000 ? 0 : 99; // Free delivery above 5000
  const total = subtotal + gst + platformFee + deliveryFee;

  const handleProceedToPayment = () => {
    // In a real app, you would process the payment here
    navigate("/payment", {
      state: {
        customerDetails,
        cartItems,
        paymentSummary: { subtotal, gst, platformFee, deliveryFee, total },
      },
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tech Arena</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-600">
            Order Summary
          </h2>
          <p className="mt-1 text-gray-500">Review your order before payment</p>
        </div>

        {/* Customer Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Customer Details
            </h3>
            <button
              onClick={() =>
                navigate("/customer-details", {
                  state: { customerDetails, cartItems },
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
                {customerDetails.address},{" "}
                {customerDetails.city} - {customerDetails.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Your Devices
          </h3>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 rounded-md object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">{item.specs}</p>
                    </div>
                    <p className="text-base font-medium text-gray-900">
                      <span className="text-gray-400">Price: </span>
                      <span>₹{item.price.toLocaleString("en-IN")}</span>
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      <span className="text-gray-400">Total Amount: </span>
                      <span>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Summary
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

          <div className="mt-8">
            <button
              onClick={handleProceedToPayment}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePreview;
