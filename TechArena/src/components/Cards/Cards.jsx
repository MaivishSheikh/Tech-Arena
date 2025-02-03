import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const CardSlider = ({ cardsToShow = 4 }) => {
  const [devices, setDevices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/devices/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setDevices(data.data);
        } else {
          console.error("Invalid data format from API:", data);
          setDevices([{ deviceName: "No data available", deviceImage: "" }]);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
        setDevices([{ deviceName: "Error fetching data", deviceImage: "" }]);
      }
    };

    fetchDevices();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsToShow < devices.length ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  if (devices.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Cards Container */}
      <div className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${(currentIndex / devices.length) * 100}%)` }}
      >
        {devices.map((device, index) => (
          <div key={index} className="flex-none flex justify-center" style={{ flexBasis: `${100 / cardsToShow}%` }}>
            <Link to={`http://localhost:5173/devices/${device.generalInfo.brandModel}`} className="w-72"> {/* Link to the specific device page */}
              <div className="bg-gray-100 rounded-lg shadow-md flex flex-col items-center" style={{height: "350px"}}>
                {device.deviceImage && (
                  <img
                    src={device.deviceImage}
                    alt={device.generalInfo.brandModel}
                    className="w-full h-full mb-2 rounded-md transition-all duration-200 ease-in-out"
                    onMouseEnter={() => {
                      // Change the image on mouse enter
                      const imageElement = document.getElementById(`image-${index}`);
                      if (imageElement && device.alternateImage) {
                        imageElement.src = device.alternateImage;
                      }
                    }}
                    onMouseLeave={() => {
                      // Revert back to the original image on mouse leave
                      const imageElement = document.getElementById(`image-${index}`);
                      if (imageElement) {
                        imageElement.src = device.deviceImage;
                      }
                    }}
                    id={`image-${index}`} // Unique ID for each image
                  />
                )}
                <h3 className="text-lg font-semibold text-center">
                  {device.generalInfo?.brandModel}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        disabled={currentIndex + cardsToShow >= devices.length}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        ▶
      </button>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="container mx-auto p-4">
      <CardSlider cardsToShow={4} />
    </div>
  );
};

export default Cards;
