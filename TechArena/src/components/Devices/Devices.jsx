import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const Devices = () => {
  const { deviceName } = useParams();
  const [device, setDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedDevices, setRelatedDevices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/devices/${deviceName}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result.success) setDevice(result.data);
        else setError(result.message);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch device details.");
      } finally {
        setLoading(false);
      }
    };

    if (deviceName) fetchDeviceDetails();
    else {
      setError("Device name is missing.");
      setLoading(false);
    }
  }, [deviceName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/devices/");
        const result = await response.json();
        if (result.success) setDevices(result.data);
        else setError(result.message);
      } catch (err) {
        setError("Failed to fetch devices.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (device && devices.length > 0) {
      const filteredDevices = devices.filter(
        (d) =>
          d.generalInfo.brandModel.startsWith(
            device.generalInfo.brandModel.split(" ")[0]
          ) && d.generalInfo.brandModel !== device.generalInfo.brandModel
      );
      setRelatedDevices(filteredDevices);
    }
  }, [device, devices]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  if (!device) return null;

  const images = [device.deviceImage, device.alternateImage];

  const nextImage = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );

  const next = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const navigateToReview = () =>
    navigate(`/reviewDevice/${device.generalInfo.brandModel}`);

  const generalInfo = [
    {
      icon: "fa-solid fa-calendar-days fa-xl",
      value: device.generalInfo.launchDate,
    },
    {
      icon: "fa-solid fa-tag fa-xl",
      value: device.generalInfo.price,
    },
    {
      icon: "fa-solid fa-camera fa-xl",
      value: device.cameraSystem.frontCamera.megaPixels?.split(",")[0],
    },
    {
      icon: "fa-solid fa-battery-full fa-xl fa-rotate-270",
      value: device.batteryCharging.batteryTC,
    },
  ];

  const sideBar = [
    {
      icon:
        device.category === "Laptop"
          ? "fa-solid fa-laptop fa-lg"
          : device.category === "Tablet"
          ? "fa-solid fa-tablet-screen-button fa-lg"
          : "fa-solid fa-mobile-screen-button fa-lg",
      value: device.display.size,
    },
    {
      icon: "fa-solid fa-code fa-lg",
      value: device.performance.os,
    },
    {
      icon: "fa-solid fa-microchip fa-lg",
      value: device.performance.cpu?.split("(")[0],
    },
    {
      icon: "bi bi-aspect-ratio-fill bi-lg",
      value: device.buildDesign.dimensions,
    },
    {
      icon: "bi bi-badge-hd-fill bi-lg",
      value: device.display.resolution,
    },
    {
      icon: "bi bi-floppy-fill bi-lg",
      value: device.performance.storage,
    },
  ];
  const mainCameraExists =
    device.cameraSystem.rearCamera.noofCamerasMP &&
    device.cameraSystem.rearCamera.features &&
    device.cameraSystem.rearCamera.video;

  const deviceDetails = {
    Performance: {
      CPU: device.performance.cpu,
      GPU: device.performance.gpu,
      OS: device.performance.os,
      Memory: device.performance.memory,
      Storage: device.performance.storage,
    },
    Display: {
      Size: device.display.size,
      Type: device.display.type,
      Resolution: device.display.resolution,
    },
    Build: {
      Dimensions: device.buildDesign.dimensions,
      Weight: device.buildDesign.weight,
      "Color Available": device.buildDesign.colorAvailable,
    },
    ...(mainCameraExists && {
      "Main Camera": {
        Cameras: device.cameraSystem.rearCamera.noofCamerasMP,
        Features: device.cameraSystem.rearCamera.features,
        "Video Recording": device.cameraSystem.rearCamera.video,
      },
    }),
    "Front Camera": {
      Camera: device.cameraSystem.frontCamera.megaPixels,
      "Video Recording": device.cameraSystem.frontCamera.videoRecording,
    },
    Battery: {
      "Battery Type": device.batteryCharging.batteryTC,
      "Charging Speed": device.batteryCharging.chargingSpeed,
      "USB Type": device.batteryCharging.usbType,
    },
    Connectivity: {
      "Network Version": device.connectivity.networkVersion || "Not Available",
      "WiFi Version": device.connectivity.wifiVersion,
      "Bluetooth Version": device.connectivity.bluetoothVersion,
      Sim: device.connectivity.sim,
    },
    Multimedia: {
      Speakers: device.audioMultimedia.speakers,
      "Headphone Jack": device.audioMultimedia.headphoneJack,
      Mic: device.audioMultimedia.mic || "No",
    },
    "Security Sensors": {
      "Fingerprint Sensor": device.securitySensors.fingerprint,
      "Face Unlock": device.securitySensors.faceUnlock,
      "Other Sensors": device.securitySensors.otherSensors,
    },
  };

  return (
    <div className="flex justify-evenly items-start p-5">
      {/* Related Devices Section */}
      <div className="bg-white shadow-md rounded-md p-4 w-1/4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Related Devices
        </h1>
        {relatedDevices.length > 0 ? (
          <ul className="grid grid-cols-3 gap-2">
            {relatedDevices.map((relatedDevice) => (
              <li key={relatedDevice._id} className="p-2 bg-cyan-50 rounded-lg">
                <NavLink
                  to={`/devices/${relatedDevice.generalInfo.brandModel}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={relatedDevice.deviceImage}
                    alt={relatedDevice.generalInfo.brandModel}
                    className="w-24 h-24 object-contain"
                  />
                  <p className="text-center pt-1 text-sm font-medium">
                    {relatedDevice.generalInfo.brandModel}
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No related devices found.</p>
        )}
      </div>

      {/* Device Details Section */}
      <div
        className="max-w-screen-lg bg-white shadow-md rounded-md p-4 text-white"
        style={{ background: "#043247" }}
      >
        <h1 className="text-3xl font-bold mb-5 border-b border-gray-300 pb-3">
          {device.generalInfo.brandModel}
        </h1>
        <div className="flex items-center justify-around mb-5">
          <div className="flex flex-col items-center">
            <div className="w-60 h-64 mb-4">
              <img
                src={images[currentIndex]}
                alt={device.generalInfo.brandModel}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-between items-center w-48">
              <button
                onClick={prevImage}
                className="p-2 border border-cyan-200 rounded-lg hover:bg-cyan-200 hover:text-black"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="flex gap-2">
                <button onClick={prev}>
                  <img
                    src={device.deviceImage}
                    alt="Thumbnail 1"
                    className="w-12 h-12 object-contain border border-cyan-200 rounded-lg"
                  />
                </button>
                <button onClick={next}>
                  <img
                    src={device.alternateImage}
                    alt="Thumbnail 2"
                    className="w-12 h-12 object-contain border border-cyan-200 rounded-lg"
                  />
                </button>
              </div>
              <button
                onClick={nextImage}
                className="p-2 border border-cyan-200 rounded-lg hover:bg-cyan-200 hover:text-black"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div
            className="flex flex-col justify-between items-center pt-10"
            style={{ height: "300px" }}
          >
            <div className="grid grid-cols-2" style={{ width: "600px" }}>
              {sideBar.map((item, index) => (
                <p
                  key={index}
                  className="text-md font-semibold flex justify-start items-center gap-2"
                >
                  <i
                    className={item.icon}
                    style={{
                      padding: "5px 0",
                      textAlign: "center",
                      width: "20px",
                    }}
                  ></i>
                  {item.label && <span>{item.label}:</span>}
                  <span
                    className="font-normal"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Ubuntu",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </span>
                </p>
              ))}
            </div>
            <div
              className="flex justify-evenly items-center"
              style={{ width: "700px" }}
            >
              {generalInfo.map((item, index) => (
                <p
                  key={index}
                  className="text-lg font-semibold flex items-center gap-2"
                >
                  <i className={item.icon}></i>
                  {item.label && <span>{item.label}:</span>}
                  <span
                    className="font-normal"
                    style={{ fontSize: "16px", fontFamily: "Ubuntu" }}
                  >
                    {item.value}
                  </span>
                </p>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <NavLink
                to={``}
                className="bg-cyan-500 text-white px-4 py-2 rounded-md"
              >
                <i className="fa-solid fa-heart"></i>
              </NavLink>
              <NavLink
                to="/compareDevice"
                state={{ device1: device.generalInfo.brandModel }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
              >
                Compare
              </NavLink>
              <NavLink
                to={`/reviewDevice/${device.generalInfo.brandModel}`}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md"
              >
                Review
              </NavLink>
              <NavLink
                to={``}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Buy Now
              </NavLink>
              <NavLink
                to={``}
                className="bg-cyan-500 text-white px-4 py-2 rounded-md"
              >
                <div
                  className="flex items-center justify-around"
                  style={{ width: "100px" }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p style={{ fontSize: "14px", fontWeight: 600}}>
                    Add to Cart
                  </p>
                  {/* Add to Cart */}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(deviceDetails).map(([section, details]) => (
            <div
              key={section}
              className="p-4 border-2 text-black rounded-lg"
              style={{ background: "#fff", boxShadow: "4px 4px 5px #000" }}
            >
              <h2 className="text-xl font-bold mb-3">{section}</h2>
              {Object.entries(details).map(([key, value]) => (
                <p
                  key={key}
                  className="text-bold"
                  style={{
                    fontFamily: "Ubuntu",
                    fontWeight: 600,
                    fontSize: "17px",
                  }}
                >
                  {key}:{" "}
                  <span
                    className="font-normal"
                    style={{ fontWeight: 400, fontSize: "15px" }}
                  >
                    {value}
                  </span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devices;
