import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Phones = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageStates, setImageStates] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/devices/");
        const result = await response.json();

        if (result.success) {
          setDevices(result.data);
          const initialImages = {};
          result.data.forEach((device) => {
            initialImages[device._id] = device.deviceImage;
          });
          setImageStates(initialImages);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch devices.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const subCategoryFilter = "Android";
  return (
    <div>
      <h1>Devices</h1>
      <ul className="grid grid-cols-3 p-5 gap-4">
        {devices
          .filter(
            (device) =>
              device.category === "Phone" &&
              device.subCategory.split(", ").includes(subCategoryFilter) 
          )
          .map((device) => (
            <li key={device._id}>
              <div className="max-w-sm p-4 bg-white shadow-lg rounded-lg border">
                <div className="flex items-center">
                  <img
                    src={imageStates[device._id]}
                    alt={device.generalInfo.brandModel}
                    onMouseEnter={() =>
                      setImageStates((prev) => ({
                        ...prev,
                        [device._id]: device.alternateImage,
                      }))
                    }
                    onMouseLeave={() =>
                      setImageStates((prev) => ({
                        ...prev,
                        [device._id]: device.deviceImage,
                      }))
                    }
                    className="p-4 transition-all duration-1000 ease-in"
                    style={{ width: "500px", height: "350px" }}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {device.generalInfo.brandModel}
                  </h2>
                  <p>{device.performance.memory}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-teal-400 text-sm">&#9733; 4.5</span>
                    <span className="ml-2 text-sm text-gray-500">(3,176)</span>
                  </div>
                </div>
                <div className="my-3">
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-black">
                      {device.generalInfo.price}
                    </span>
                  </div>
                </div>
                <NavLink to={`/devices/${device.generalInfo.brandModel}`} className="mt-4 w-full bg-teal-500 hover:bg-cyan-600 text-white py-2 px-4 rounded">
                  View Details
                </NavLink>
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
