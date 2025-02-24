import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const UserPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/users/${username}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (result.success) setUser(result.data);
        else setError(result.message);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchUser();
    else {
      setError("User is missing.");
      setLoading(false);
    }
  }, [username]);

  const handleLogout = () => {
    console.log("Before logout:", localStorage.getItem("user"));

    localStorage.removeItem("user");
    setUser(null);

    window.dispatchEvent(new Event("storage"));

    navigate("/");

    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!user) return null;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 border-b-2 border-gray-300 pb-4">
            User Profile
          </h1>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-600">
                Username
              </span>
              <span className="text-lg text-gray-800">{user.username}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-600">
                Full Name
              </span>
              <span className="text-lg text-gray-800">{user.fullname}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-600">Email</span>
              <span className="text-lg text-gray-800">{user.email}</span>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
