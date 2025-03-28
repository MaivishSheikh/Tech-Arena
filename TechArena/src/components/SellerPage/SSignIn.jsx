import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sellingOnline from "../../assets/sellingOnline.png";

const SSignin = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    busiName: "",
    busiAddress: "",
    gstNo: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^.+@.+\..+$/.test(formData.email))
      newErrors.email = "Email must be valid.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.busiName.trim())
      newErrors.busiName = "Business name is required.";
    if (!formData.busiAddress.trim())
      newErrors.busiAddress = "Business address is required.";
    if (!formData.gstNo.trim()) newErrors.gstNo = "GST number is required.";
    else if (
      !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(formData.gstNo)
    )
      newErrors.gstNo =
        "GST number must be in a valid format (e.g., 22ABCDE1234F1Z5).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/sellers/listSellers",
        formData
      );
      if (response.data.data) {
        localStorage.setItem("seller", JSON.stringify(response.data.data));
        navigate("/sellerDashboard");
      }
    } catch (error) {
      setErrors({ form: "Failed to register seller." });
    }
  };

  const features = [
    {
      title: "Reach Tech Enthusiasts Across India",
      description:
        "Sell your products to a dedicated audience interested in technology, from casual users to professionals.",
    },
    {
      title: "Higher Profits",
      description:
        "With competitive pricing and low commission rates, maximize your earnings on every sale.",
    },
    {
      title: "Dedicated Account Management",
      description:
        "Our expert team helps you manage your listings and grow your business efficiently.",
    },
    {
      title: "Lower Return Charges",
      description:
        "With transparent and minimal return fees, enjoy stress-free shipping and returns.",
    },
    {
      title: "Smart Pricing Calculator",
      description:
        "Use our intuitive pricing tool to set the most competitive price for your devices.",
    },
    {
      title: "24x7 Seller Support",
      description:
        "Get assistance anytime from our dedicated support team to resolve queries quickly.",
    },
    {
      title: "Fast & Regular Payments",
      description:
        "Receive payments within 7-10 days of order fulfillment, ensuring smooth cash flow.",
    },
    {
      title: "Manage Your Business Anywhere",
      description:
        "Use our seller dashboard and mobile app to track sales and manage inventory on the go.",
    },
  ];

  return (
    <>
      <div className="">
        <div className="py-5 pt-2 flex items-center justify-end">
          <div
            className="bg-white shadow-lg rounded-lg p-8"
            style={{ width: "500px" }}
          >
            <div className="flex justify-between items-center mb-8">
              <div
                className={`flex items-center space-x-2 ${
                  step === 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Basic Details</span>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div
                className={`flex items-center space-x-2 ${
                  step === 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Business Details</span>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password *
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute translate-y-1.5 inset-y-0 right-0 px-3 flex items-center outline-none text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="busiName"
                    value={formData.busiName}
                    onChange={handleChange}
                    placeholder="Enter Business Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  {errors.busiName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.busiName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="busiAddress"
                    value={formData.busiAddress}
                    onChange={handleChange}
                    placeholder="Enter Business Address"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  {errors.busiAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.busiAddress}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    GST Number *
                  </label>
                  <input
                    type="text"
                    name="gstNo"
                    value={formData.gstNo}
                    onChange={handleChange}
                    placeholder="Enter GST Number"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  {errors.gstNo && (
                    <p className="text-red-500 text-sm mt-1">{errors.gstNo}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className={`text-blue-600 hover:text-blue-700 ${
                  step === 1 ? "text-gray-400 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={step === 2 ? handleSubmit : handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {step === 2 ? "Register" : "Next"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center p-8 mx-20">
            <img src={sellingOnline} alt="Illustration" className="w-96 h-96" />
          </div>
        </div>
        <div className="py-6 bg-gray-200 pb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Why Sell on Tech Arena?
          </h2>
          <div
            className="grid grid-cols-4 gap-8 mx-auto px-6"
            style={{ width: "1400px" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-5 pr-7 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3
                  className="mb-2 text-gray-700"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "17px",
                    fontWeight: 600,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SSignin;
