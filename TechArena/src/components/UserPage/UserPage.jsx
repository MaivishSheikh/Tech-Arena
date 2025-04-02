// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, NavLink } from "react-router-dom";

// const UserPage = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(
//     () => JSON.parse(localStorage.getItem("user")) || null
//   );

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/v1/users/${username}`);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const result = await response.json();
//         if (result.success) setUser(result.data);
//         else setError(result.message);
//       } catch (err) {
//         setError("Failed to fetch user details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (username) fetchUser();
//     else {
//       setError("User is missing.");
//       setLoading(false);
//     }
//   }, [username]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.dispatchEvent(new Event("storage"));
//     navigate("/");
//     setTimeout(() => window.location.reload(), 50);
//   };

//   if (loading)
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <i className="fas fa-spinner fa-spin text-4xl text-gray-700"></i>
//       </div>
//     );

//   if (error) return <p className="text-red-600 text-center text-lg font-semibold">{error}</p>;
//   if (!user) return null;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
//       <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-center text-gray-800 border-b pb-4">User Profile</h1>
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="flex items-center gap-3">
//             <i className="fas fa-user text-gray-600 text-lg"></i>
//             <span className="text-lg text-gray-800">{user.username}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <i className="fas fa-id-badge text-gray-600 text-lg"></i>
//             <span className="text-lg text-gray-800">{user.fullname}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <i className="fas fa-envelope text-gray-600 text-lg"></i>
//             <span className="text-lg text-gray-800">{user.email}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <i className="fas fa-calendar text-gray-600 text-lg"></i>
//             <span className="text-lg text-gray-800">Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <i className="fas fa-map-marker-alt text-gray-600 text-lg"></i>
//             <span className="text-lg text-gray-800">{user.location || "Not Provided"}</span>
//           </div>
//         </div>
//         <div className="flex justify-between items-center mt-8">
//           {user.username === "m__sheikh07" && (
//             <NavLink to="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all">
//               <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
//             </NavLink>
//           )}
//           <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all">
//             <i className="fas fa-sign-out-alt mr-2"></i> Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Cart from "../Cart/Cart.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";

const UserPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [activeTab, setActiveTab] = useState("profile");

  const adminUsers = ["m__sheikh07", "maivish9044"];

  const isAdmin = user && adminUsers.includes(user.username);

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
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
    setTimeout(() => window.location.reload(), 50);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (isAdmin) {
    return <Dashboard />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="mx-auto px-4 py-6" style={{width: "1400px"}}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col items-center pb-4 border-b">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-3">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className="fas fa-user text-4xl text-gray-400"></i>
                  )}
                </div>
                <h2 className="text-lg font-semibold">{user.fullname}</h2>
                <p className="text-gray-500 text-sm">@{user.username}</p>
              </div>

              <nav className="mt-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <i className="fas fa-user-circle mr-2"></i> My Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                    activeTab === "orders"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <i className="fas fa-box-open mr-2"></i> My Orders
                </button>
                <button
                  onClick={() => setActiveTab("cart")}
                  className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                    activeTab === "cart"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <i className="fas fa-heart mr-2"></i> Cart
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                    activeTab === "addresses"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <i className="fas fa-map-marker-alt mr-2"></i> Saved Addresses
                </button>
                {user.username === "m__sheikh07" && (
                  <NavLink
                    to="/dashboard"
                    className="w-full text-left px-3 py-2 rounded-md mb-1 text-gray-700 hover:bg-gray-100 block"
                  >
                    <i className="fas fa-tachometer-alt mr-2"></i> Admin
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 mt-4"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Panel */}
          <div className="w-full md:w-3/4">
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <i className="fas fa-pencil-alt mr-1"></i> Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </h3>
                    <p className="text-gray-800">{user.fullname}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Username
                    </h3>
                    <p className="text-gray-800">@{user.username}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Email Address
                    </h3>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Mobile Number
                    </h3>
                    <p className="text-gray-800">
                      {user.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-800">
                      {user.location || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Member Since
                    </h3>
                    <p className="text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold border-b pb-4 mb-6">
                  My Orders
                </h2>
                <div className="text-center py-10">
                  <i className="fas fa-box-open text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">
                    You haven't placed any orders yet
                  </p>
                  <NavLink
                    to="/products"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Start Shopping
                  </NavLink>
                </div>
              </div>
            )}

            {activeTab === "cart" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold border-b pb-4 mb-6">
                  My Cart
                </h2>
                <Cart />
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <i className="fas fa-plus mr-1"></i> Add New Address
                  </button>
                </div>
                <div className="text-center py-10">
                  <i className="fas fa-map-marker-alt text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">
                    You don't have any saved addresses
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
