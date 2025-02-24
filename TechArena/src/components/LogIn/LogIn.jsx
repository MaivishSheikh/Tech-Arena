import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

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

    if (formData.username === "m__sheikh07" && formData.password === "maivish9044") {
      navigate("/deviceShowcase");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData
      );

      if (response.data.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        setErrorMessage("No User Found. Re-check your credentials");
      }
    } catch (error) {
      setErrorMessage("No User Found. Re-check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <div className="pt-5 flex flex-col items-center text-sm">
          <div className="flex items-center">
            <p className="mr-2 font-medium">Don't have an account?</p>
            <NavLink
              to="/users"
              className="text-cyan-800 font-semibold text-base"
            >
              Sign Up
            </NavLink>
          </div>
          {errorMessage && (
            <p className="text-red-600 mt-2 text-center">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
