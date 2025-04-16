import React from "react";
import CardSection from "../CardSection/CardSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SDashboard(props) {
  const { companyName } = useParams();
  const [deviceCount, setDeviceCount] = useState(null);
  const [dVCount, setDVCount] = useState(null);
  const [requestCount, setRequestCount] = useState(null);
  const [seller, setSeller] = useState(
    () => JSON.parse(localStorage.getItem("seller")) || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/sellers/${companyName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setSeller(result.data);
          localStorage.setItem("seller", JSON.stringify(result.data));
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch seller details.");
      } finally {
        setLoading(false);
      }
    };

    if (companyName) {
      fetchSeller();
    } else {
      setError("Company name is missing.");
      setLoading(false);
    }
  }, [companyName]);

  useEffect(() => {
    const handleStorageChange = () => {
      setSeller(JSON.parse(localStorage.getItem("seller")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch device count
        const devicesResponse = await fetch("http://localhost:8000/api/v1/devices/");
        const devicesData = await devicesResponse.json();
        setDeviceCount(devicesData?.data?.length || 0);

        // Fetch variant count
        const variantsResponse = await fetch("http://localhost:8000/api/v1/deviceVariants/viewVariants");
        const variantsData = await variantsResponse.json();
        setDVCount(variantsData?.data?.length || 0);

        // Fetch request count
        const requestsResponse = await fetch("http://localhost:8000/api/v1/productRequests/");
        const requestsData = await requestsResponse.json();
        setRequestCount(requestsData?.data?.length || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  if (!seller) return null;

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
            iconClass="fa-solid fa-laptop fa-lg"
            iconColor="#FF667D"
            viewLink="/viewDevices"
          />
          <CardSection
            title="Device Variants"
            value={dVCount !== null ? dVCount : (
              <span style={{ fontSize: '14px', fontStyle: 'italic', color: 'gray' }}>
                Loading
              </span>
            )}
            iconClass="fa-solid fa-file fa-lg"
            iconColor="#25A18E"
            viewLink={`/viewDVBrand/${companyName}`}
          />
          <CardSection
            title="Product Requests"
            value={requestCount !== null ? requestCount : (
              <span style={{ fontSize: '14px', fontStyle: 'italic', color: 'gray' }}>
                Loading
              </span>
            )}
            iconClass="fa-solid fa-message fa-lg"
            iconColor="#25A18E"
            addLink="/requestProduct"
            viewLink="/productRequests"
          />
          <CardSection
            title="Stocks"
            value={requestCount !== null ? requestCount : (
              <span style={{ fontSize: '14px', fontStyle: 'italic', color: 'gray' }}>
                Loading
              </span>
            )}
            iconClass="fa-solid fa-message fa-lg"
            iconColor="#25A18E"
            addLink="/stock"
          />
        </div>
      </div>
    </>
  );
}