import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DVariants = () => {
  const { deviceName } = useParams();
  const navigate = useNavigate();
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/deviceVariants/variants/${deviceName}`
        );
        if (response.data.success) {
          setVariants(response.data.data);
        } else {
          setError("Failed to fetch device variants.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [deviceName]);

  const handleSelectVariant = (variant) => {
    navigate("/customer-details", { state: { variant } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Choose a {deviceName} Variant</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {variants.map((variant) => (
          <div
            key={variant._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{variant.deviceName}</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">RAM:</span> {variant.memory}
              </p>
              <p>
                <span className="font-medium">Storage:</span> {variant.storage}
              </p>
              <p>
                <span className="font-medium">Color:</span> {variant.colorAvailable}
              </p>
              <p>
                <span className="font-medium">Price:</span> ₹{variant.price}
              </p>
            </div>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => handleSelectVariant(variant)}
            >
              Select Variant
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DVariants;