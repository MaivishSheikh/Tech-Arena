import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StockManagementPage = () => {
  const [stock, setStock] = useState({ items: [] });
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  // Get current seller info
  const currentSeller = JSON.parse(localStorage.getItem("seller"));
  const sellerName = currentSeller?.companyName;

  // Filter devices and stock items by current seller
  const sellerDevices = devices.filter(device => 
    device.generalInfo?.brandModel?.includes(sellerName)
  );
  
  const sellerStockItems = stock.items.filter(item => 
    item.device?.generalInfo?.brandModel?.includes(sellerName)
  );

  // Fetch stock data
  const fetchStock = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/v1/stocks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setStock(data.data || { items: [] });
      } else {
        throw new Error(data.message || "Failed to fetch stock");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch available devices
  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/v1/devices/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDevices(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch devices");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStock();
    fetchDevices();
  }, []);

  // Add to stock handler
  const handleAddToStock = async (e) => {
    e.preventDefault();
    if (!selectedDevice) {
      toast.error("Please select a device");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/v1/stocks/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          deviceId: selectedDevice,
          quantity: parseInt(quantity),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Device added to stock successfully");
        fetchStock();
        setSelectedDevice("");
        setQuantity(1);
      } else {
        throw new Error(data.message || "Failed to add to stock");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update stock item handler
  const handleUpdateStockItem = async (deviceId) => {
    if (!quantity || quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/api/v1/stocks/updateStock/${deviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: parseInt(quantity),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Stock item updated successfully");
        fetchStock();
        setEditingItem(null);
        setQuantity(1);
      } else {
        throw new Error(data.message || "Failed to update stock item");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove from stock handler
  const handleRemoveFromStock = async (deviceId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/api/v1/stocks/deleteItems/${deviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Device removed from stock");
        fetchStock();
      } else {
        throw new Error(data.message || "Failed to remove from stock");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear stock handler
  const handleClearStock = async () => {
    if (!window.confirm("Are you sure you want to clear your entire stock?")) {
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/v1/stocks/clearStock", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Stock cleared successfully");
        fetchStock();
      } else {
        throw new Error(data.message || "Failed to clear stock");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item.device._id);
    setSelectedDevice(item.device._id);
    setQuantity(item.quantity);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingItem(null);
    setSelectedDevice("");
    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Stock Management
      </h1>

      {/* Add/Edit Stock Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {editingItem ? "Edit Stock Item" : "Add to Stock"}
        </h2>
        <form
          onSubmit={
            editingItem
              ? (e) => {
                  e.preventDefault();
                  handleUpdateStockItem(editingItem);
                }
              : handleAddToStock
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="device"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Device
              </label>
              <select
                id="device"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                disabled={editingItem !== null}
                required
              >
                <option value="">Select a device</option>
                {sellerDevices.map((device) => (
                  <option key={device._id} value={device._id}>
                    {device.generalInfo?.brandModel || "N/A"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="flex items-end">
              {editingItem ? (
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add to Stock"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Stock List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Your Current Stock</h2>
          {sellerStockItems.length > 0 && (
            <button
              onClick={handleClearStock}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
              disabled={isLoading}
            >
              {isLoading ? "Clearing..." : "Clear All Stock"}
            </button>
          )}
        </div>

        {isLoading && sellerStockItems.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : sellerStockItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You don't have any items in stock yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellerStockItems.map((item) => (
                  <tr key={item.device._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.device.deviceImage && (
                          <div className="flex-shrink-0 h-15 w-20">
                            <img
                              className="h-full w-full"
                              src={item.device.deviceImage}
                              alt={item.device.deviceID}
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.device.deviceID}
                          </div>
                          <div className="text-sm">
                            {item.device.generalInfo?.brandModel || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.device.category || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.device.generalInfo?.price || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => startEditing(item)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveFromStock(item.device._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
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

export default StockManagementPage;