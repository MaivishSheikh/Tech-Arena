import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SLogin = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    busiName: "",
    email: "",
    // password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/sellers/login",
        formData
      );

      if (response.data.data.seller) {
        localStorage.setItem(
          "seller",
          JSON.stringify(response.data.data.seller)
        );
        window.dispatchEvent(new Event("storage"));
        navigate("/sellerDashboard");
      } else {
        setErrorMessage("No Seller Found. Re-check your credentials");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Login</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
          <div className="py-2">
            <input
              type="text"
              name="busiName"
              value={formData.busiName}
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              placeholder="Business Name"
              required
            />
          </div>
          <div className="py-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              placeholder="Email"
              required
            />
          </div>

          {/* <div className="relative py-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center outline-none text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div> */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <svg
              className="w-6 h-6 -ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">Login</span>
          </button>
          <div className="mt-4 space-y-4">
            <p className="text-center text-sm">Don't have an account?</p>
            <NavLink
              to="/sellerLogin"
              className="w-full text-center block border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              Register for new account
            </NavLink>
            <p className="text-xs text-gray-500 text-center mt-2">
              By continuing, you agree to Tech Arena's{" "}
              <a href="/terms" className="text-blue-600">
                Terms of Use
              </a>{" "}
              &
              <a href="/privacy" className="text-blue-600">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SLogin;
