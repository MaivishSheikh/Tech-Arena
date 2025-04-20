// import React from "react";
// import CardSection from "../CardSection/CardSection";
// import { useState, useEffect } from "react";

// export default function Dashboard(props) {
//   const [userCount, setUserCount] = useState(null);
//   const [deviceCount, setDeviceCount] = useState(null);
//   const [sellerCount, setSellerCount] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/v1/users/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         if (data && Array.isArray(data.data)) {
//           setUserCount(data.data.length);
//         } else {
//           setUserCount(0);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/v1/devices/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         if (data && Array.isArray(data.data)) {
//           setDeviceCount(data.data.length);
//         } else {
//           setDeviceCount(0);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/v1/sellers/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         if (data && Array.isArray(data.data)) {
//           setSellerCount(data.data.length);
//         } else {
//           setSellerCount(0);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <>
//       <div className="p-10">
//         <h1
//           className="mb-5"
//           style={{ fontFamily: "Roboto", fontSize: "30px", fontWeight: 700 }}
//         >
//           Overview
//         </h1>
//         <div className="flex justify-evenly items-center my-3">
//           <CardSection
//             title="Users"
//             value={
//               userCount !== null ? (
//                 userCount
//               ) : (
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontStyle: "italic",
//                     color: "gray",
//                   }}
//                 >
//                   Loading
//                 </span>
//               )
//             }
//             percentage="83.4"
//             iconClass="fa-solid fa-users fa-lg"
//             iconColor="#E8C547"
//             viewLink="/viewUsers"
//           />
//           <CardSection
//             title="Devices"
//             value={
//               deviceCount !== null ? (
//                 deviceCount
//               ) : (
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontStyle: "italic",
//                     color: "gray",
//                   }}
//                 >
//                   Loading
//                 </span>
//               )
//             }
//             percentage="83.4"
//             iconClass="fa-solid fa-laptop fa-lg"
//             iconColor="#FF667D"
//             viewLink="/viewDevices"
//             addLink="/addDevices"
//             upLink="/deviceShowcase/All"
//           />
//           <CardSection
//             title="Seller"
//             value={
//               sellerCount !== null ? (
//                 sellerCount
//               ) : (
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontStyle: "italic",
//                     color: "gray",
//                   }}
//                 >
//                   Loading
//                 </span>
//               )
//             }
//             percentage="83.4"
//             iconClass="fa-solid fa-shop fa-lg"
//             iconColor="#5BDA83"
//             viewLink="/viewSellers"
//           />
//         </div>
//         <div className="flex justify-evenly items-center my-12 mb-3">
//           <CardSection
//             title="Stock"
//             value="18"
//             percentage="83.4"
//             iconClass="fa-solid fa-message fa-lg"
//             iconColor="#25A18E"
//           />
//           <CardSection
//             title="Payment"
//             value="18"
//             percentage="83.4"
//             iconClass="fa-solid fa-message fa-lg"
//             iconColor="#25A18E"
//           />
//           <CardSection
//             title="Device Variants"
//             value="18"
//             percentage="83.4"
//             iconClass="fa-solid fa-file fa-lg"
//             iconColor="#25A18E"
//             addLink="/deviceVariants"
//             viewLink="/viewDV"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import CardSection from "../CardSection/CardSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Dashboard(props) {
  const { user } = useParams();
  const [userCount, setUserCount] = useState(null);
  const [dVCount, setDVCount] = useState(null);
  const [dRCount, setDRCount] = useState(null);
  const [deviceCount, setDeviceCount] = useState(null);
  const [sellerCount, setSellerCount] = useState(null);
  const [stockCount, setStockCount] = useState(null);
  const [msgCount, setMsgCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [usersRes, devicesRes, sellersRes, dRRes, dVRes, stockRes, msgRes] = await Promise.all([
          fetch("http://localhost:8000/api/v1/users/"),
          fetch("http://localhost:8000/api/v1/devices/"),
          fetch("http://localhost:8000/api/v1/sellers/"),
          fetch("http://localhost:8000/api/v1/productRequests/"),
          fetch("http://localhost:8000/api/v1/deviceVariants/viewVariants"),
          fetch("http://localhost:8000/api/v1/stocks/"),
          fetch("http://localhost:8000/api/v1/messages/")
        ]);

        const [usersData, devicesData, sellersData, dRData, dVData, stockData, msgData] = await Promise.all([
          usersRes.json(),
          devicesRes.json(),
          sellersRes.json(),
          dRRes.json(),
          dVRes.json(),
          stockRes.json(),
          msgRes.json()
        ]);

        setUserCount(usersData?.data?.length || 0);
        setDeviceCount(devicesData?.data?.length || 0);
        setSellerCount(sellersData?.data?.length || 0);
        setDRCount(dRData?.data?.length || 0);
        setDVCount(dVData?.data?.length || 0);
        setStockCount(stockData?.data?.length || 0);
        setMsgCount(msgData?.data?.length || 0);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CardSection
            title="Total Users"
            value={loading ? "..." : userCount}
            percentage="83.4"
            iconClass="fas fa-users"
            iconColor="bg-indigo-500"
            viewLink="/viewUsers"
            loading={loading}
          />
          <CardSection
            title="Total Devices"
            value={loading ? "..." : deviceCount}
            percentage="83.4"
            iconClass="fas fa-laptop"
            iconColor="bg-red-500"
            viewLink="/viewDevices"
            addLink="/addDevices"
            upLink="/deviceShowcase/All"
            loading={loading}
          />
          <CardSection
            title="Total Sellers"
            value={loading ? "..." : sellerCount}
            percentage="83.4"
            iconClass="fas fa-store"
            iconColor="bg-green-500"
            viewLink="/viewSellers"
            loading={loading}
          />
          <CardSection
            title="Total Messages"
            value={loading ? "..." : msgCount}
            percentage="83.4"
            iconClass="fas fa-store"
            iconColor="bg-green-500"
            viewLink="/viewMsg"
            loading={loading}
          />
          <CardSection
            title="Device Variants"
            value={loading ? "..." : dVCount}
            percentage="83.4"
            iconClass="fas fa-mobile-alt"
            iconColor="bg-blue-500"
            addLink="/deviceVariants"
            viewLink={`/viewDV`}
            loading={false}
          />
          <CardSection
            title="Stocks"
            value={loading ? "..." : sellerCount}
            percentage="83.4"
            iconClass="fas fa-mobile-alt"
            iconColor="bg-blue-500"
            addLink="/deviceVariants"
            viewLink={`/adminStock`}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}