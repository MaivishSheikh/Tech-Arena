import React from "react";

export default function DeviceCards({
  deviceImage,
  deviceName,
  devicePrice,
  deviceSpeci,
}) {
  return (
    <>
      <div className="max-w-sm p-4 bg-white shadow-lg rounded-lg border">
        <div className="flex items-center">
          <img
            src={deviceImage}
            alt="Samsung Galaxy S23 Ultra"
            className="p-4"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div className="">
          <h2 className="text-lg font-bold">{deviceName}</h2>
          <p className="text-sm text-gray-500">{deviceSpeci}</p>
          <div className="flex items-center mt-1">
            <span className="text-teal-400 text-sm">&#9733; 4.5</span>
            <span className="ml-2 text-sm text-gray-500">(3,176)</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-black">₹{devicePrice}</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-teal-500 hover:bg-cyan-600 text-white py-2 px-4 rounded">
          Add to cart
        </button>
        <p className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline">
          +2 other colors/patterns
        </p>
      </div>
    </>
  );
}
