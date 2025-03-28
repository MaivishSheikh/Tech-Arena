import React from "react";
import CardSection from "../CardSection/CardSection";
import { useState, useEffect } from "react";

export default function SDashboard(props) {
  const [deviceCount, setDeviceCount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/devices/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && Array.isArray(data.data)) {
          setDeviceCount(data.data.length);
        } else {
          setDeviceCount(0);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="p-10">
        <h1 className="mb-5" style={{ fontFamily: "Ubuntu", fontSize: "20px" }}>
          Overview
        </h1>
        <div className="flex justify-evenly items-center gap-5">
          <CardSection
            title="Devices"
            value={deviceCount !== null ? deviceCount : (
              <span style={{ fontSize: '14px', fontStyle: 'italic', color: 'gray' }}>
                Loading
              </span>
            )}
            percentage="83.4"
            iconClass="fa-solid fa-laptop fa-lg"
            iconColor="#FF667D"
            viewLink="/viewDevices"
          />
          <CardSection
            title="Device Variants"
            value="18"
            percentage="83.4"
            iconClass="fa-solid fa-file fa-lg"
            iconColor="#25A18E"
            viewLink="/viewDV"
          />
          <CardSection
            title="Payments"
            value="18"
            percentage="83.4"
            iconClass="fa-solid fa-message fa-lg"
            iconColor="#25A18E"
          />
        </div>
      </div>
    </>
  );
}
