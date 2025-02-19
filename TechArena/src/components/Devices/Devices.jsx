import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Devices = () => {
  const { deviceName } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageState, setImageState] = useState("");

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/devices/${deviceName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result.success) {
          setDevice(result.data);
          setImageState(result.data.deviceImage);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch device details.");
      } finally {
        setLoading(false);
      }
    };

    if (deviceName) {
      fetchDeviceDetails();
    } else {
      setError("Device name is missing.");
      setLoading(false);
    }
  }, [deviceName]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  const psz = "20px"
  const ssz = "15px"

  return (
    <div className="mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        {device.generalInfo.brandModel}
      </h1>
      <div className="flex items-center justify-center bg-white shadow-md rounded-md mb-3 py-3">
        <div className="w-1/3">
          <img
            src={imageState}
            alt={device.generalInfo.brandModel}
            onMouseEnter={() => setImageState(device.alternateImage)}
            onMouseLeave={() => setImageState(device.deviceImage)}
            className="w-60 h-64 object-contain transition-all duration-300 ease-in-out"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">
            Launch Date:{" "}
            <span style={{ fontWeight: 400, fontSize: {ssz} }}>
              {device.generalInfo.launchDate}
            </span>
          </p>

          <p className="text-lg font-semibold">
            Price:{" "}
            <span style={{ fontWeight: 400, fontSize: {ssz} }}>
              {device.generalInfo.price}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Front Camera:{" "}
            <span style={{ fontWeight: 400, fontSize: {ssz} }}>
              {device.cameraSystem.frontCamera.megaPixels}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Battery:{" "}
            <span style={{ fontWeight: 400, fontSize: {ssz} }}>
              {device.batteryCharging.batteryTC}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-5 border p-5 rounded-lg shadow-md bg-white">
        <div className="w-max grid grid-cols-3 gap-3">
          <div className="border p-3 rounded-lg shadow-sm bg-gray-100">
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 600,
                fontSize: "25px",
              }}
            >
              Performance
            </h2>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600, fontSize: {psz} }}>
              CPU:{" "}
              <span style={{ fontWeight: 400, fontSize: {ssz} }}>{device.performance.cpu}</span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              GPU:{" "}
              <span style={{ fontWeight: 400 }}>{device.performance.gpu}</span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Memory:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.performance.memory} RAM
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Storage:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.performance.storage} ROM
              </span>
            </p>
          </div>
          <div className="border p-3 rounded-lg shadow-sm bg-gray-100">
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Display
            </h2>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Size:{" "}
              <span style={{ fontWeight: 400 }}>{device.display.size}</span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Type:{" "}
              <span style={{ fontWeight: 400 }}>{device.display.type}</span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Resolution:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.display.resolution}
              </span>
            </p>
          </div>
          <div className="border p-3 rounded-lg shadow-sm bg-gray-100" style={{fontSize: "15px"}}>
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Rear Camera
            </h2>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Cameras:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.cameraSystem.rearCamera.noofCamerasMP}
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Features:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.cameraSystem.rearCamera.features}
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Video:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.cameraSystem.rearCamera.video}
              </span>
            </p>
          </div>
          <div className="border p-3 rounded-lg shadow-sm bg-gray-100" style={{fontSize: "15px"}}>
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Front Camera
            </h2>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Cameras:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.cameraSystem.frontCamera.megaPixels}
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Video:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.cameraSystem.frontCamera.videoRecording}
              </span>
            </p>
          </div>
          <div className="border p-3 rounded-lg shadow-sm bg-gray-100">
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Battery
            </h2>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Capacity:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.batteryCharging.batteryTC} mAh
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Charging Speed:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.batteryCharging.chargingSpeed}
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              USB Type:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.batteryCharging.usbType}
              </span>
            </p>
          </div>
          <div className="border p-3 rounded-lg shadow-sm bg-gray-100">
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Build
            </h2>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Dimensions:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.buildDesign.dimensions} 
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Weight:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.buildDesign.weight}
              </span>
            </p>
            <p style={{ fontFamily: "Ubuntu", fontWeight: 600 }}>
              Color Available:{" "}
              <span style={{ fontWeight: 400 }}>
                {device.buildDesign.colorAvailable}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
