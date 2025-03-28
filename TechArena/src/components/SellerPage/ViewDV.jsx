import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewDV() {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/deviceVariants/viewVariants");
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto p-6 my-4 bg-white shadow-2xl rounded-lg" style={{ maxWidth: "1300px" }}>
      <h1 className="text-2xl font-semibold">Device Variants</h1>
      <div className="h-full w-full px-4 mt-6">
        <table className="w-full min-w-max table-auto text-left rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">S.No</th>
              <th className="p-4">Device Name</th>
              <th className="p-4">Memory</th>
              <th className="p-4">Storage</th>
              <th className="p-4">Color</th>
              <th className="p-4">Price (INR)</th>
            </tr>
          </thead>
          <tbody>
            {variants.map(({ deviceName, memory, storage, colorAvailable, price }, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-semibold">{index + 1}</td>
                <td className="px-4 py-2">{deviceName}</td>
                <td className="px-4 py-2">{memory}</td>
                <td className="px-4 py-2">{storage}</td>
                <td className="px-4 py-2">{colorAvailable}</td>
                <td className="px-4 py-2 font-semibold">₹{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}