import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const CardSlider = ({ cardsToShow = 5 }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

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

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="bg-emerald-200" style={{ background: "#C0DFFF" }}>
        <div className="w-full mx-auto pb-10" style={{ maxWidth: "1350px", padding: "20px 0 60px" }}>
          <div className="relative">
            <h1
              className="text-center text-3xl font-extrabold py-10"
              style={{ fontFamily: "Ubuntu" }}
            >
              Popular Devices
            </h1>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white py-2.5 px-4 rounded-full z-10"
              style={{ padding: "10px 18px" }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white py-2.5 px-4 rounded-full z-10"
              style={{ padding: "10px 18px" }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div>
            <Swiper
              slidesPerView={cardsToShow}
              spaceBetween={20}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation]}
              className="mySwiper px-10"
            >
              {devices.map((device, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center"
                >
                  <Link to={`/devices/${device.generalInfo.brandModel}`}>
                    <div className="border border-blue-700 grid rounded-md bg-white transition-all duration-300">
                      {device.deviceImage && (
                        <img
                          src={device.deviceImage}
                          alt={device.generalInfo.brandModel}
                          className="w-full h-64 object-contain p-3 transition-all duration-300 ease-in-out"
                          // style={{height: "300px"}}
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSlider;
