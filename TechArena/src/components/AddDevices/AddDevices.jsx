import React, { useState } from "react";

export default function AddDevices(props) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [inputValues, setInputValues] = useState({
    deviceName: "",
    launchDate: "",
    price: ""
  });

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="mx-auto p-6 my-4 bg-white shadow-lg rounded-lg"
        style={{ fontFamily: "Ubuntu", maxWidth: "1200px" }}
      >
        <h1 className="text-center" style={{ fontSize: "35px", fontWeight: 700 }}>
          Add Devices
        </h1>
        <div style={{ fontSize: "23px", fontWeight: 700, padding: "10px 0" }}>
          <h1 className="py-2">General Information</h1>
          <div
            className="grid grid-cols-3 gap-6 pt-2 pb-1"
            style={{ fontSize: "15px", fontWeight: 400 }}
          >
            {[
              { label: "Device Name", name: "deviceName" },
              { label: "Launch Date", name: "launchDate" },
              { label: "Price ( ₹ )", name: "price" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label
                  className={`absolute transition-all duration-200 left-0 bottom-1 ${
                    focusedInput === field.name || inputValues[field.name] ? "text-[12px] -translate-y-3 text-blue-500 font-small" : "text-base font-medium"
                  }`}
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={inputValues[field.name]}
                  className="w-full pl-0 p-2 pb-1 outline-none border-b-2 border-black"
                  onFocus={() => setFocusedInput(field.name)}
                  onBlur={() => setFocusedInput(null)}
                  onChange={handleInputChange}
                  style={{fontSize: "16px", fontWeight: 500}}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "23px", fontWeight: 700 }}>
          <h1 className="py-2">Build & Design</h1>
          <div
            className="grid grid-cols-3 gap-6 pt-2 pb-1"
            style={{ fontSize: "15px", fontWeight: 400 }}
          >
            {[
              { label: "Dimensions", name: "dimensions" },
              { label: "Weight", name: "Weight" },
              { label: "Color Available", name: "colorAvailable" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label
                  className={`absolute transition-all duration-200 left-0 bottom-2 ${
                    focusedInput === field.name || inputValues[field.name] ? "text-sm -translate-y-6 text-blue-500 font-medium" : "text-base font-medium"
                  }`}
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={inputValues[field.name]}
                  className="w-full pl-0 p-2 outline-none border-b-2 border-black"
                  onFocus={() => setFocusedInput(field.name)}
                  onBlur={() => setFocusedInput(null)}
                  onChange={handleInputChange}
                  style={{fontSize: "16px", fontWeight: 500}}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "23px", fontWeight: 700 }}>
          <h1 className="py-2">Display</h1>
          <div
            className="grid grid-cols-3 gap-6 pt-2 pb-1"
            style={{ fontSize: "15px", fontWeight: 400 }}
          >
            {[
              { label: "Size", name: "Size" },
              { label: "Type", name: "Type" },
              { label: "Resolution", name: "Resolution" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label
                  className={`absolute transition-all duration-200 left-0 bottom-2 ${
                    focusedInput === field.name || inputValues[field.name] ? "text-sm -translate-y-6 text-blue-500 font-medium" : "text-base font-medium"
                  }`}
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={inputValues[field.name]}
                  className="w-full pl-0 p-2 outline-none border-b-2 border-black"
                  onFocus={() => setFocusedInput(field.name)}
                  onBlur={() => setFocusedInput(null)}
                  onChange={handleInputChange}
                  style={{fontSize: "16px", fontWeight: 500}}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-6 pt-5 items-center">
            <button className="bg-cyan-500 text-white rounded-md py-2 px-4" style={{fontSize: "18px", fontWeight: 500}}>Submit</button>
            <button className="bg-rose-500 text-white rounded-md py-2 px-4" style={{fontSize: "18px", fontWeight: 500}}>Reset</button>
        </div>
      </div>
    </>
  );
}