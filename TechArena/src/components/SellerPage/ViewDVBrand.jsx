import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function ViewDVBrand() {
  const { sellerName } = useParams(); // Assuming sellerName is passed in URL
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    deviceName: "",
    brand: sellerName, // Default to sellerName
    memory: "",
    storage: "",
    colorAvailable: "",
    price: ""
  });

  useEffect(() => {
    fetchVariantsByBrand();
  }, [sellerName]);

  const fetchVariantsByBrand = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/deviceVariants/brandVariants/${sellerName}`
      );

      console.log(response.data.data.variants)
      
      if (response.data.success) {
        setVariants(response.data.data.variants);
      } else {
        setError(response.data.message || "Failed to fetch device variants.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (variant) => {
    setEditingId(variant._id);
    setEditFormData({
      deviceName: variant.deviceName,
      brand: variant.brand,
      memory: variant.memory,
      storage: variant.storage,
      colorAvailable: variant.colorAvailable,
      price: variant.price
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleUpdate = async (variantId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/deviceVariants/updateVariant/${variantId}`,
        editFormData
      );
      
      if (response.data.success) {
        toast.success("Variant updated successfully");
        setEditingId(null);
        fetchVariantsByBrand();
      } else {
        toast.error(response.data.message || "Failed to update variant");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating variant");
    }
  };

  const handleDelete = async (variantId) => {
    if (!window.confirm("Are you sure you want to delete this variant?")) return;
    
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/deviceVariants/deleteVariant/${variantId}`
      );
      
      if (response.data.success) {
        toast.success("Variant deleted successfully");
        fetchVariantsByBrand();
      } else {
        toast.error(response.data.message || "Failed to delete variant");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting variant");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (loading) return <div className="text-center py-8">Loading variants...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="mx-auto p-6 my-4 bg-white shadow-2xl rounded-lg" style={{ maxWidth: "1300px" }}>
      <h1 className="text-2xl font-semibold mb-2">Device Variants for {sellerName}</h1>
      <p className="text-gray-600 mb-6">Manage all device variants for your brand</p>
      
      <div className="h-full w-full px-4">
        <table className="w-full min-w-max table-auto text-left rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">S.No</th>
              <th className="p-4">Device Name</th>
              <th className="p-4">Memory</th>
              <th className="p-4">Storage</th>
              <th className="p-4">Color</th>
              <th className="p-4">Price (INR)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.length > 0 ? (
              variants.map((variant, index) => (
                <tr key={variant._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold">{index + 1}</td>
                  
                  {editingId === variant._id ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="deviceName"
                          value={editFormData.deviceName}
                          onChange={handleEditFormChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="memory"
                          value={editFormData.memory}
                          onChange={handleEditFormChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="storage"
                          value={editFormData.storage}
                          onChange={handleEditFormChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="colorAvailable"
                          value={editFormData.colorAvailable}
                          onChange={handleEditFormChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="price"
                          value={editFormData.price}
                          onChange={handleEditFormChange}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleUpdate(variant._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{variant.deviceName}</td>
                      <td className="px-4 py-2">{variant.memory}</td>
                      <td className="px-4 py-2">{variant.storage}</td>
                      <td className="px-4 py-2">{variant.colorAvailable}</td>
                      <td className="px-4 py-2 font-semibold">₹{variant.price}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleEditClick(variant)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(variant._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No variants found for {sellerName}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}