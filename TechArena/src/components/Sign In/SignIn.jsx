import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const validate = () => {
    let newErrors = {};

    if (!/(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(formData.username)) {
      newErrors.username = "Username must contain at least one number and one special character.";
    }

    if (!/^.+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Email must be a valid @gmail.com address.";
    }

    if (!/(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/.test(formData.password)) {
      newErrors.password = "Password must be 8-15 characters long, with at least one number and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
      setErrors({ form: "User Already Exists" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

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
          {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
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
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
        {errors.form && <p className="text-red-600 mt-2 text-center">{errors.form}</p>}

        <div className="pt-5 flex flex-col items-center text-sm">
          <div className="pt-5 flex items-center justify-center" style={{ fontFamily: "Ubuntu", fontSize: "13px" }}>
            <p className="mr-3" style={{ fontWeight: 500 }}>
              Already have an Account? 
            </p>
            <NavLink to="/login" style={{ fontWeight: 600, fontSize: "16px" }} className="text-cyan-800">
              Log In
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
