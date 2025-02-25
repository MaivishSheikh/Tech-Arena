import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

export default function CompareDevice() {
  const location = useLocation();
  const [device1, setDevice1] = useState(null);
  const [device2, setDevice2] = useState(null);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.device1) {
      setSearchQuery1(location.state.device1);
      fetchDeviceDetails(location.state.device1, setDevice1);
    }
  }, [location.state]);

  const fetchDeviceDetails = async (deviceName, setDevice) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/devices/${deviceName}`
      );
      if (!response.ok) throw new Error("Device not found");
      const result = await response.json();
      if (result.success) setDevice(result.data);
      else setError(result.message);
    } catch (err) {
      setError("Failed to fetch device details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query, setDevice) => {
    if (query.trim() !== "") fetchDeviceDetails(query, setDevice);
  };

  const renderDevice = (device) => {
    if (!device) {
      return <p className="text-gray-500 text-center">No device selected</p>;
    }

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
        icon: "fa-solid fa-code",
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
        "Network Version":
          device.connectivity.networkVersion || "Not Available",
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
      <div className="bg-white shadow-md rounded-lg p-4 w-full text-white"  style={{background: "#043247"}}>
        <h1 className="text-2xl font-bold mb-4 text-center border-b pb-2">
          {device.generalInfo.brandModel}
        </h1>
        <div className="flex items-center">
        <div className="flex flex-col items-center">
          <img
            src={device.deviceImage}
            alt={device.generalInfo.brandModel}
            className="w-56 h-48 object-contain"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sideBar.map((item, index) => (
            <p
              key={index}
              className="text-md font-semibold"
            >
              <i
                className={item.icon}
                style={{ textAlign: "center"}}
              ></i>
              {item.label && <span>{item.label}:</span>}
              <span
                className="mx-4"
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
        </div>
        
        <div className="flex justify-evenly items-center">
          {generalInfo.map((item, index) => (
            <p
              key={index}
              className="text-md font-semibold flex items-center gap-2"
            >
              <i className={item.icon}></i>
              <span>{item.value}</span>
            </p>
          ))}
        </div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          {Object.entries(deviceDetails).map(([section, details]) => (
            <div key={section} className="p-4 border-2 text-black rounded-lg" style={{background: "#fff", boxShadow: "4px 4px 5px #000"}}>
              <h2 className="text-xl font-bold mb-3" style={{fontSize: "25px"}}>{section}</h2>
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
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen w-full p-4 gap-6">
      {/* Left Section - Device 1 */}
      <div className="w-full md:w-1/2 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-300 p-4">
        <h2 className="text-lg font-bold mb-2">Device 1</h2>
        <div className="flex items-center w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Search device 1..."
            className="px-3 py-2 w-full rounded-md bg-gray-200 text-black outline-none"
            value={searchQuery1}
            onChange={(e) => setSearchQuery1(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch(searchQuery1, setDevice1)
            }
          />
          <button
            onClick={() => handleSearch(searchQuery1, setDevice1)}
            className="ml-2 px-3 py-2 rounded-md bg-blue-600 text-white"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {loading && <Spinner className="h-10 w-10 text-gray-900/50 mt-4" />}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {renderDevice(device1)}
      </div>

      {/* Right Section - Device 2 */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-4">
        <h2 className="text-lg font-bold mb-2">Device 2</h2>
        <div className="flex items-center w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Search device 2..."
            className="px-3 py-2 w-full rounded-md bg-gray-200 text-black outline-none"
            value={searchQuery2}
            onChange={(e) => setSearchQuery2(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch(searchQuery2, setDevice2)
            }
          />
          <button
            onClick={() => handleSearch(searchQuery2, setDevice2)}
            className="ml-2 px-3 py-2 rounded-md bg-blue-600 text-white"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {loading && <Spinner className="h-10 w-10 text-gray-900/50 mt-4" />}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {renderDevice(device2)}
      </div>
    </div>
  );
}
