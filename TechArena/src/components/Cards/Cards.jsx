import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cards = ({ cardsToShow = 7 }) => {
  const [devices, setDevices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
          const sortedDevices = result.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setDevices(sortedDevices);
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

  const maxIndex = Math.max(0, Math.ceil(devices.length / cardsToShow) + 1.5);
  const minIndex = 0;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (devices.length === 0) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div
        className="w-full mx-auto max-w-7xl px-4"
        style={{ maxWidth: "1350px" }}
      >
        <div className="flex max-w-full justify-between items-center py-10">
          <button
            onClick={prevSlide}
            disabled={currentIndex == minIndex}
            className="transform rounded-full px-4 py-2 text-lg"
            style={{
              color: currentIndex == minIndex ? "#343434" : "#B5D8CC",
              cursor: "pointer",
              background: currentIndex == minIndex ? "#B5D8CC" : "#343434",
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h1
            className="text-center text-3xl font-extrabold"
            style={{ fontFamily: "Ubuntu" }}
          >
            Popular Devices
          </h1>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="transform rounded-full px-4 py-2 text-lg"
            style={{
              color: currentIndex >= maxIndex ? "#343434" : "#B5D8CC",
              cursor: "pointer",
              background: currentIndex >= maxIndex ? "#B5D8CC" : "#343434",
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="relative overflow-hidden pb-10">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              width: `${devices.length * (100 / 6)}%`,
              display: "flex",
            }}
          >
            {devices.map((device, index) => (
              <div
                key={index}
                className="flex justify-center items-center"
                style={{
                  flex: `0 0 calc(100% / ${cardsToShow})`,
                  maxWidth: `calc(100% / ${cardsToShow})`,
                  paddingRight: "10px",
                }}
              >
                <Link
                  to={`/devices/${device.generalInfo.brandModel}`}
                  className="w-72"
                  style={{ width: "250px" }}
                >
                  <div
                    className="border border-gray-400 flex flex-col items-center rounded-md overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl"
                    style={{ boxShadow: "5px 5px 10px #2122236b" }}
                  >
                    {device.deviceImage && (
                      <img
                        src={device.deviceImage}
                        alt={device.generalInfo.brandModel}
                        className="w-full h-64 object-contain p-3 transition-all duration-300 ease-in-out"
                        id={`image-${index}`}
                        onMouseEnter={(e) => {
                          if (device.alternateImage) {
                            e.target.src = device.alternateImage;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.src = device.deviceImage;
                        }}
                      />
                    )}
                    <h3 className="text-lg font-semibold text-center p-3">
                      {device.generalInfo?.brandModel}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "1450px",
          margin: "auto",
          borderBottom: "1px solid black",
          padding: "10px 0",
        }}
      />
    </>
  );
};

export default Cards;
