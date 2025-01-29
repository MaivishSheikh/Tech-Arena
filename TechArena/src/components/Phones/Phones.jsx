import React, { useEffect, useState } from "react";
import mobileBG from "../../assets/mobileBG.jpg";

const Phones = () => {
  const [devices, setDevices] = useState([]); // To store user data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/devices/");
        const result = await response.json();

        if (result.success) {
          setDevices(result.data); // Update state with user data
        } else {
          setError(result.message); // Handle error message
        }
      } catch (err) {
        setError("Failed to fetch devices.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
  <h1>Devices</h1>
  <ul className="grid grid-cols-3 gap-4">
    {devices
    .filter((device) => device.category === "Phone")
    .map((device) => (
      <li key={device._id}>
        <div className="max-w-sm p-4 bg-white shadow-lg rounded-lg border">
          <div className="flex items-center">
            <img
              src={device.deviceImage}
              alt={device.deviceName}
              className="p-4"
              style={{ width: "500px", height: "250px" }}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">{device.deviceName}</h2>
            <p className="text-sm text-gray-500">{device.memory} {device.storage}</p>
            <div className="flex items-center mt-1">
              <span className="text-teal-400 text-sm">&#9733; 4.5</span>
              <span className="ml-2 text-sm text-gray-500">(3,176)</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-black">₹{device.price}</span>
            </div>
          </div>

          <button className="mt-4 w-full bg-teal-500 hover:bg-cyan-600 text-white py-2 px-4 rounded">
            Add to cart
          </button>
          <p className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline">
            +2 other colors/patterns
          </p>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Phones;
