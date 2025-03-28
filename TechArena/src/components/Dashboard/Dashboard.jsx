import React from "react";
import CardSection from "../CardSection/CardSection";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
  const [userCount, setUserCount] = useState(null);
  const [deviceCount, setDeviceCount] = useState(null);
  const [sellerCount, setSellerCount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && Array.isArray(data.data)) {
          setUserCount(data.data.length);
        } else {
          setUserCount(0);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/sellers/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && Array.isArray(data.data)) {
          setSellerCount(data.data.length);
        } else {
          setSellerCount(0);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="p-10">
        <h1
          className="mb-5"
          style={{ fontFamily: "Roboto", fontSize: "30px", fontWeight: 700 }}
        >
          Overview
        </h1>
        <div className="flex justify-evenly items-center my-3">
          <CardSection
            title="Users"
            value={
              userCount !== null ? (
                userCount
              ) : (
                <span
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  Loading
                </span>
              )
            }
            percentage="83.4"
            iconClass="fa-solid fa-users fa-lg"
            iconColor="#E8C547"
            viewLink="/viewUsers"
          />
          <CardSection
            title="Devices"
            value={
              deviceCount !== null ? (
                deviceCount
              ) : (
                <span
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  Loading
                </span>
              )
            }
            percentage="83.4"
            iconClass="fa-solid fa-laptop fa-lg"
            iconColor="#FF667D"
            viewLink="/viewDevices"
            addLink="/addDevices"
            upLink="/deviceShowcase/All"
          />
          <CardSection
            title="Seller"
            value={
              sellerCount !== null ? (
                sellerCount
              ) : (
                <span
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  Loading
                </span>
              )
            }
            percentage="83.4"
            iconClass="fa-solid fa-shop fa-lg"
            iconColor="#5BDA83"
            viewLink="/viewSellers"
          />
        </div>
        <div className="flex justify-evenly items-center my-12 mb-3">
          <CardSection
            title="Stock"
            value="18"
            percentage="83.4"
            iconClass="fa-solid fa-message fa-lg"
            iconColor="#25A18E"
          />
          <CardSection
            title="Payment"
            value="18"
            percentage="83.4"
            iconClass="fa-solid fa-message fa-lg"
            iconColor="#25A18E"
          />
          <CardSection
            title="Device Variants"
            value="18"
            percentage="83.4"
            iconClass="fa-solid fa-file fa-lg"
            iconColor="#25A18E"
            addLink="/deviceVariants"
            viewLink="/viewDV"
          />
        </div>
      </div>
    </>
  );
}
