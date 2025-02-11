import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Devices = () => {
  const { deviceName } = useParams(); // Get device name from URL
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="border mx-5 my-3">
        <h1
          className="text-3xl text-center"
          style={{ fontFamily: "Ubuntu", fontWeight: 800 }}
        >
          {device.generalInfo.brandModel}
        </h1>
      </div>
      <div
        className="flex justify-around p-2 border mx-auto items-center"
        style={{ width: "1000px" }}
      >
        <div className="border flex items-center p-4" style={{ width: "300px", height: "300px" }}>
          <img
            src={imageState}
            alt={device.generalInfo.brandModel}
            onMouseEnter={() => setImageState(device.alternateImage)}
            onMouseLeave={() => setImageState(device.deviceImage)}
            className="transition-all duration-2000 ease-in-out transform"
            style={{width: "500px", height: "250px"}}
          />
        </div>
        <div className="flex justify-between" style={{ width: "500px" }}>
          <div>
            <p>{device.generalInfo.launchDate}</p>
            <p>{device.generalInfo.price}</p>
            <p>{device.performance.memory} RAM</p>
            <p>{device.performance.storage}</p>
          </div>
          <div>
            <p>{device.performance.cpu}</p>
            <p>{device.cameraSystem.frontCamera.megaPixels} MP</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devices;
