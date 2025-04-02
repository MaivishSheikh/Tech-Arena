import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      "http://localhost:8000/api/v1/users/login",
      formData
    );

    if (response.data.data && response.data.data.user) {
      // Store both tokens properly
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      
      // Set default axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`;
      
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } else {
      setErrorMessage("Login failed. Please try again.");
    }
  } catch (error) {
    setErrorMessage(
      error.response?.data?.message || 
      "Invalid credentials. Please try again."
    );
  }
};

  return (
    <div className="py-8 bg-gray-100 flex items-center justify-center">
      <div className="flex items-center justify-center p-8 mr-20">
        <img
          src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
          alt="Illustration"
          className="w-96 h-96"
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg" style={{ width: "500px" }}>
        <div className="w-full py-4">
          <div
            className="py-4 pb-10"
            style={{ fontFamily: "Iceberg", fontSize: "25px", fontWeight: 700 }}
          >
            <div className="flex justify-center items-center">
              <img src={logo} alt="" className="w-10 h-10 rounded-4xl" />
              <span className="ml-2">TechArena</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              placeholder="Username"
              required
            />
            <div className="relative mt-5">
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
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
            <div className="my-8 mx-16 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                className="font-bold shadow-sm rounded-lg bg-[#f0f0f0] p-2 flex justify-center items-center gap-2"
                type="button"
              >
                <div className="bg-white py-1 px-1.5 rounded-full">
                  <i className="fa-brands fa-google fa-lg"></i>
                </div>
                <span className="ml-4">Login with Google</span>
              </button>
              <button
                className="font-bold shadow-sm rounded-lg bg-[#f0f0f0] p-2 flex justify-center items-center gap-2"
                type="button"
              >
                <div className="bg-white py-1 px-1.5 rounded-full">
                  <i className="fa-brands fa-facebook fa-lg"></i>
                </div>
                <span className="ml-4">Login with Facebook</span>
              </button>
            </div>
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
            <p className="mt-6 text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <NavLink
                to="/users"
                className="border-b border-gray-500 border-dotted"
              >
                Sign Up
              </NavLink>
            </p>
            {errorMessage && (
              <p className="text-red-600 mt-2 text-center">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
