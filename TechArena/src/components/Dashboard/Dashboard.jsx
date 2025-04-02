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

export default function Dashboard(props) {
  const [userCount, setUserCount] = useState(null);
  const [deviceCount, setDeviceCount] = useState(null);
  const [sellerCount, setSellerCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [usersRes, devicesRes, sellersRes] = await Promise.all([
          fetch("http://localhost:8000/api/v1/users/"),
          fetch("http://localhost:8000/api/v1/devices/"),
          fetch("http://localhost:8000/api/v1/sellers/")
        ]);

        const [usersData, devicesData, sellersData] = await Promise.all([
          usersRes.json(),
          devicesRes.json(),
          sellersRes.json()
        ]);

        setUserCount(usersData?.data?.length || 0);
        setDeviceCount(devicesData?.data?.length || 0);
        setSellerCount(sellersData?.data?.length || 0);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="fas fa-bell text-gray-500 text-xl"></i>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <i className="fas fa-user"></i>
            </div>
          </div>
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
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CardSection
            title="Stock Status"
            value="18"
            percentage="83.4"
            iconClass="fas fa-boxes"
            iconColor="bg-teal-500"
            loading={false}
          />
          <CardSection
            title="Payments"
            value="18"
            percentage="83.4"
            iconClass="fas fa-credit-card"
            iconColor="bg-purple-500"
            loading={false}
          />
          <CardSection
            title="Device Variants"
            value="18"
            percentage="83.4"
            iconClass="fas fa-mobile-alt"
            iconColor="bg-blue-500"
            addLink="/deviceVariants"
            viewLink="/viewDV"
            loading={false}
          />
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <i className="fas fa-user text-gray-500"></i>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">New user registered</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}