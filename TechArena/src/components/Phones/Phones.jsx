import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FilterBar from "../FilterBar/FilterBar";

const Phones = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageStates, setImageStates] = useState({});
  const [filters, setFilters] = useState({
    brands: [],
    subCategory: [],
    operatingSystem: [],
  });

  const location = useLocation();
  const { subCategory: querySubCategory } = location.state || {};

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

  useEffect(() => {
    if (querySubCategory) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        subCategory: [querySubCategory],
      }));
    }
  }, [querySubCategory]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredDevices = devices.filter((device) => {
    const matchesBrand =
      filters.brands.length === 0 || filters.brands.some((sub) => device.subCategory.split(", ").includes(sub));
    const matchesCategory =
      filters.subCategory.length === 0 || filters.subCategory.some((sub) => device.subCategory.split(", ").includes(sub));
    const matchesOS =
      filters.operatingSystem.length === 0 || filters.operatingSystem.some((sub) => device.subCategory.split(", ").includes(sub));

    return matchesBrand && matchesCategory && matchesOS;
  });

  return (
    <div className="flex">
      <FilterBar setFilters={handleFilterChange} />
      <div>
        <ul className="grid grid-cols-4 p-5 gap-4">
          {filteredDevices.map((device) => (
            <li key={device._id}>
              <NavLink to={`/devices/${device.generalInfo.brandModel}`}>
                <div className="p-4 bg-white shadow-lg rounded-lg border" style={{ maxWidth: "300px" }}>
                  <div className="flex items-center flex-col">
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
                      className="p-2 transition-all duration-1000 ease-in"
                      style={{ width: "300px", height: "250px" }}
                    />
                    <h2 className="text-lg font-bold">{device.generalInfo.brandModel}</h2>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Phones;
