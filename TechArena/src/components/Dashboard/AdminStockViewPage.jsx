import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStockViewPage = () => {
  const [stock, setStock] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if current user is admin or alternate admin
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const adminUsers = ["m__sheikh07", "maivish9044"];
  const alternateAdmin = ["rishabhg29", "rishabhGupta29"];

  const isAdmin = adminUsers.includes(currentUser?.username);
  const isAlternateAdmin = alternateAdmin.includes(currentUser?.username);
  const canView = isAdmin || isAlternateAdmin;

  // Fetch stock data
  const fetchStock = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch("http://localhost:8000/api/v1/stocks/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch stock");
      }

      const data = await response.json();
      console.log("Received stock data:", data); // Add this line
      setStock(data.data || { items: [] });
    } catch (error) {
      toast.error(error.message);
      if (
        error.message.includes("Unauthorized") ||
        error.message.includes("No authentication")
      ) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication first
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!canView) {
      toast.error("You don't have permission to access this page");
      navigate("/");
      return;
    }

    fetchStock();
  }, [canView, navigate]);

  if (!canView) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isAdmin ? "Admin" : "Alternate Admin"} Stock Overview
        </h1>
        <div className="text-sm text-gray-500">
          Logged in as: {currentUser?.username}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            All Stock Entries
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View-only mode for administrative purposes
          </p>
        </div>

        {isLoading && stock.items.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : stock.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No stock items found in the system.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              {/* <tbody className="bg-white divide-y divide-gray-200">
                {stock.items.map((item) => (
                  <tr key={`${item.device._id}-${item.device.seller?._id || 'no-seller'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.device.seller?.companyName || "No seller info"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.device.seller?.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.device.deviceImage && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item.device.deviceImage}
                              alt={item.device.deviceID}
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.device.deviceID}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.device.generalInfo?.brandModel || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.device.category || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.device.generalInfo?.price || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody> */}
              <tbody className="bg-white divide-y divide-gray-200">
                {stock.items.map((item) => (
                  <tr
                    key={`${item.device?._id || "no-device"}-${
                      item.sellerInfo?._id || "no-seller"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.sellerInfo?.companyName || "No seller info"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.sellerInfo?.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.device?.deviceImage && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item.device.deviceImage}
                              alt={item.device.deviceID}
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.device?.brand || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.device?.generalInfo?.brandModel || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.device?.category || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.device?.generalInfo?.price || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStockViewPage;
