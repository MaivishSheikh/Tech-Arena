import React, { useState, useEffect } from "react";

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/devices/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setDevices(result.data);
        } else {
          console.error("Invalid data format from API:", result);
          setDevices([]);
        }
      } catch (err) {
        setError("Failed to fetch devices.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 <= Math.ceil(devices.length / 5) - 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : Math.ceil(devices.length / 5) - 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">No devices found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative max-w-7xl w-full overflow-hidden px-10">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full text-gray-700 hover:bg-opacity-100 transition-all z-10 shadow-lg"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full text-gray-700 hover:bg-opacity-100 transition-all z-10 shadow-lg"
        >
          &gt;
        </button>

        {/* Cards Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 5)}%)`,
            width: `${devices.length * 20}%`, // Each card takes 20% of the container width
          }}
        >
          {devices.map((device, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/5 p-4" // Each card takes 20% of the container width
            >
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                {device.deviceImage && (
                  <img
                    src={device.deviceImage}
                    alt={device.generalInfo.brandModel}
                    className="w-48 h-48 object-contain mb-6"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {device.generalInfo?.brandModel}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;