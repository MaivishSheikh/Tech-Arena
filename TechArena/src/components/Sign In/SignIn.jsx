import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

const Signin = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        avatar: null,
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                body: new FormData(e.target),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                setError(null);
                setFormData({
                    username: "",
                    email: "",
                    fullName: "",
                    password: "",
                    avatar: null,
                });

                // Navigate to another component after successful registration
                navigate("/users"); // Replace "/welcome" with your target route
            } else {
                setError(result.message || "Registration failed.");
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                {success && <p className="text-green-500">Registration successful!</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block mb-2">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block mb-2">Avatar:</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
                </form>
                <div className="mt-4 text-center">
                    <NavLink to="/signin" className="text-blue-500 hover:underline">Already have an account? Sign in</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Signin;
