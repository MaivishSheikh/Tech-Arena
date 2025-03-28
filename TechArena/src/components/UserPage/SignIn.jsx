import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const validate = () => {
  //   let newErrors = {};
  //   if (!/(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(formData.username)) {
  //     newErrors.username =
  //       "Username must contain a number and a special character.";
  //   }
  //   if (!/^.+@gmail\.com$/.test(formData.email)) {
  //     newErrors.email = "Email must be a valid @gmail.com address.";
  //   }
  //   if (!/(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/.test(formData.password)) {
  //     newErrors.password =
  //       "Password must be 8-15 characters with a number and a special character.";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/listUsers",
        formData
      );
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        setErrors({ form: "User Already Exists" });
      }
    } catch (error) {
      setErrors({ form: error });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-sm w-full max-w-md p-8 mb-4">
        <div
          className="py-4 pb-3"
          style={{ fontFamily: "Iceberg", fontSize: "25px", fontWeight: 700 }}
        >
          <div className="flex justify-center items-center">
            <img src={logo} alt="" className="w-10 h-10 rounded-4xl" />
            <span className="ml-2">TechArena</span>
          </div>
        </div>

        <p className="mx-auto text-center w-72 text-gray-500 font-semibold mb-6">
          Sign up with your details to get started
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              style={{ fontFamily: "Poppins", fontSize: "15px" }}
              className={`w-full h-11 p-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md bg-gray-50 focus:border-gray-400 outline-none`}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              style={{ fontFamily: "Poppins", fontSize: "15px" }}
              className="w-full h-11 p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-gray-400 outline-none"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              style={{ fontFamily: "Poppins", fontSize: "15px" }}
              className={`w-full h-11 p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md bg-gray-50 focus:border-gray-400 outline-none`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              style={{ fontFamily: "Poppins", fontSize: "15px" }}
              className={`w-full h-11 p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md bg-gray-50 focus:border-gray-400 outline-none pr-10`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash fa-lg"></i>
              ) : (
                <i className="fa-solid fa-eye fa-lg"></i>
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            style={{ fontFamily: "Poppins", fontSize: "18px" }}
            className="w-full bg-blue-500 text-white p-2.5 rounded-3xl text-sm font-semibold hover:bg-blue-600 active:bg-blue-700"
          >
            Sign Up
          </button>
          {errors.form && (
            <p className="text-red-500 text-xs text-center mt-2">
              {errors.form}
            </p>
          )}
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 text-xs font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="text-center">
          <button className="text-blue-900 text-sm font-semibold flex items-center justify-center w-full">
            <i className="fab fa-facebook-square mr-2 text-lg"></i>
            Log in with Facebook
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-300 rounded-sm w-full max-w-md p-4 text-center">
        <p style={{ fontFamily: "Poppins", fontSize: "15px" }}>
          Have an account?
          <NavLink to="/login" className="text-blue-500 ml-2 underline font-semibold">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
