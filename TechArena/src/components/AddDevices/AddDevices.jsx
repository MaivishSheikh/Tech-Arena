import React, { useState, useRef } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDevices(props) {
  const [image, setImage] = useState(null);
  const [altImage, setAltImage] = useState(null);
  const fileInputRef = useRef(null);
  const altFileInputRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [inputValues, setInputValues] = useState({
    brandModel: "",
    launchDate: "",
    price: "",
    dimensions: "",
    weight: "",
    colorsAvailable: "",
    size: "",
    type: "",
    resolution: "",
    cpu: "",
    gpu: "",
    os: "",
    memory: "",
    storage: "",
    rearCameraNo: "",
    rearCameraFeatures: "",
    rearCameraVideo: "",
    frontCameraMegaPixels: "",
    frontCameraVideo: "",
    batteryTypeCapacity: "",
    chargingSpeed: "",
    usbType: "",
    fingerprint: "",
    faceUnlock: "",
    otherSensors: "",
    networkVersion: "",
    wifiVersion: "",
    bluetoothVersion: "",
    sim: "",
    speakers: "",
    headphoneJack: "",
    audioSupport: "",
    mic: "",
    additionalFeatures: "",
    category: "",
    brand: "",
    subCategory: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleImageChange = (event, setImageFunction) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFunction(imageUrl);
    }
  };

  const validateFields = () => {
    // Required fields validation
    const requiredFields = [
      "brandModel",
      "launchDate",
      "price",
      "dimensions",
      "weight",
      "colorsAvailable",
      "size",
      "type",
      "resolution",
      "cpu",
      "gpu",
      "os",
      "memory",
      "storage",
      "rearCameraNo",
      "rearCameraFeatures",
      "frontCameraMegaPixels",
      "batteryTypeCapacity",
      "networkVersion",
      "category",
      "brand"
    ];

    const emptyFields = requiredFields.filter((field) => !inputValues[field]);

    if (emptyFields.length > 0) {
      toast.error(`Please fill all required fields`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    // Image validation
    if (!fileInputRef.current?.files[0]) {
      toast.error(`Please upload a device image`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    // Price validation
    if (isNaN(inputValues.price) || parseFloat(inputValues.price) <= 0) {
      toast.error(`Price must be a positive number`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  const handleReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (altFileInputRef.current) altFileInputRef.current.value = "";

    setImage(null);
    setAltImage(null);

    setInputValues({
      brandModel: "",
      launchDate: "",
      price: "",
      dimensions: "",
      weight: "",
      colorsAvailable: "",
      size: "",
      type: "",
      resolution: "",
      cpu: "",
      gpu: "",
      os: "",
      memory: "",
      storage: "",
      rearCameraNo: "",
      rearCameraFeatures: "",
      rearCameraVideo: "",
      frontCameraMegaPixels: "",
      frontCameraVideo: "",
      batteryTypeCapacity: "",
      chargingSpeed: "",
      usbType: "",
      fingerprint: "",
      faceUnlock: "",
      otherSensors: "",
      networkVersion: "",
      wifiVersion: "",
      bluetoothVersion: "",
      sim: "",
      speakers: "",
      headphoneJack: "",
      audioSupport: "",
      mic: "",
      additionalFeatures: "",
      category: "",
      brand: "",
      subCategory: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const formData = new FormData();

    const data = {
      category: inputValues.category,
      brand: inputValues.brand,
      subCategory: inputValues.subCategory,
      generalInfo: {
        brandModel: inputValues.brandModel,
        launchDate: inputValues.launchDate,
        price: inputValues.price,
      },
      buildDesign: {
        dimensions: inputValues.dimensions,
        weight: inputValues.weight,
        colorAvailable: inputValues.colorsAvailable,
      },
      display: {
        size: inputValues.size,
        type: inputValues.type,
        resolution: inputValues.resolution,
      },
      performance: {
        cpu: inputValues.cpu,
        gpu: inputValues.gpu,
        os: inputValues.os,
        memory: inputValues.memory,
        storage: inputValues.storage,
      },
      cameraSystem: {
        rearCamera: {
          noofCamerasMP: inputValues.rearCameraNo,
          features: inputValues.rearCameraFeatures,
          video: inputValues.rearCameraVideo,
        },
        frontCamera: {
          megaPixels: inputValues.frontCameraMegaPixels,
          videoRecording: inputValues.frontCameraVideo,
        },
      },
      batteryCharging: {
        batteryTC: inputValues.batteryTypeCapacity,
        chargingSpeed: inputValues.chargingSpeed,
        usbType: inputValues.usbType,
      },
      connectivity: {
        networkVersion: inputValues.networkVersion,
        wifiVersion: inputValues.wifiVersion,
        bluetoothVersion: inputValues.bluetoothVersion,
        sim: inputValues.sim,
      },
      audioMultimedia: {
        speakers: inputValues.speakers,
        headphoneJack: inputValues.headphoneJack,
        audioSupport: inputValues.audioSupport,
        mic: inputValues.mic,
      },
      securitySensors: {
        fingerprint: inputValues.fingerprint,
        faceUnlock: inputValues.faceUnlock,
        otherSensors: inputValues.otherSensors,
      },
      additionalFeatures: inputValues.additionalFeatures,
    };

    const appendFormData = (data, parentKey = "") => {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (value && typeof value === "object" && !(value instanceof File)) {
          appendFormData(value, formKey);
        } else {
          formData.append(formKey, value);
        }
      });
    };

    appendFormData(data);

    if (fileInputRef.current?.files[0]) {
      formData.append("deviceImage", fileInputRef.current.files[0]);
    }
    if (altFileInputRef.current?.files[0]) {
      formData.append("alternateImage", altFileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/devices/listDevices",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        toast.success("Device added successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpen(true);
        handleReset();
      } else {
        toast.error("Failed to add device. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Failed to add device. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="mx-auto p-8 my-6 bg-white shadow-lg rounded-xl"
        style={{ fontFamily: "Ubuntu", width: "1300px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2
            className="text-center mb-6 text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Poppins" }}
          >
            Add Devices
          </h2>
          <div className="grid gap-4">
            <div
              className="p-6 border rounded-lg shadow-sm"
              style={{ background: "#F7F5FB" }}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Device Images
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Device Image */}
                <div className="flex-1 p-6 bg-white border rounded-lg shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        Device Image
                      </label>
                      <label className="cursor-pointer bg-cyan-500 text-white rounded-md py-2 px-4 flex items-center gap-2 hover:bg-cyan-600 transition-colors">
                        <i className="fa-solid fa-upload"></i> Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setImage)}
                          ref={fileInputRef}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {image && (
                      <div className="flex justify-center">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-64 h-64 object-contain border rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Alternate Image */}
                <div className="flex-1 p-6 bg-white border rounded-lg shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        Alternate Image
                      </label>
                      <label className="cursor-pointer bg-cyan-500 text-white rounded-md py-2 px-4 flex items-center gap-2 hover:bg-cyan-600 transition-colors">
                        <i className="fa-solid fa-upload"></i> Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setAltImage)}
                          ref={altFileInputRef}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {altImage && (
                      <div className="flex justify-center">
                        <img
                          src={altImage}
                          alt="Preview"
                          className="w-64 h-64 object-contain border rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="border shadow-sm gap-6 p-6 rounded-lg grid grid-cols-2"
              style={{ background: "#F7F5FB" }}
            >
              {/* Category Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Category
                  </h2>
                  <div className="flex justify-evenly items-center">
                    <div className="flex items-center">
                      <input
                        id="C1"
                        type="radio"
                        name="category"
                        value="Phone"
                        checked={inputValues.category === "Phone"}
                        onChange={handleInputChange}
                        className="w-4 h-4 border-gray-300 mr-2"
                      />
                      <label htmlFor="C1" className="text-gray-700">
                        Phone
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="C2"
                        type="radio"
                        name="category"
                        value="Tablet"
                        checked={inputValues.category === "Tablet"}
                        onChange={handleInputChange}
                        className="w-4 h-4 border-gray-300 mr-2"
                      />
                      <label htmlFor="C2" className="text-gray-700">
                        Tablet
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="C3"
                        type="radio"
                        name="category"
                        value="Laptop"
                        checked={inputValues.category === "Laptop"}
                        onChange={handleInputChange}
                        className="w-4 h-4 border-gray-300 mr-2"
                      />
                      <label htmlFor="C3" className="text-gray-700">
                        Laptop
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Brand
                  </h2>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={inputValues.brand}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md outline-none w-full"
                    style={{width: "180px"}}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Sub Category
                  </h2>
                  <input
                    type="text"
                    name="subCategory"
                    placeholder="Sub Categories"
                    value={inputValues.subCategory}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md outline-none w-full"
                    style={{width: "320px"}}
                  />
                </div>
                </div>
                
              </div>

              {/* General Information Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  General Information
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Device Name
                    </label>
                    <input
                      type="text"
                      name="brandModel"
                      placeholder="Device Name"
                      value={inputValues.brandModel}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Launch Date
                    </label>
                    <input
                      type="text"
                      name="launchDate"
                      placeholder="Launch Date"
                      value={inputValues.launchDate}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Price</label>
                    <input
                      type="text"
                      name="price"
                      placeholder="Price"
                      value={inputValues.price}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Build & Design Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  Build & Design
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      placeholder="Dimensions"
                      value={inputValues.dimensions}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      placeholder="Weight"
                      value={inputValues.weight}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Colors Available
                    </label>
                    <input
                      type="text"
                      name="colorsAvailable"
                      placeholder="Colors Available"
                      value={inputValues.colorsAvailable}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Display Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">Display</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Size</label>
                    <input
                      type="text"
                      name="size"
                      placeholder="Size"
                      value={inputValues.size}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Type</label>
                    <input
                      type="text"
                      name="type"
                      placeholder="Type"
                      value={inputValues.type}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Resolution
                    </label>
                    <input
                      type="text"
                      name="resolution"
                      placeholder="Resolution"
                      value={inputValues.resolution}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Performance Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  Performance
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">CPU</label>
                    <input
                      type="text"
                      name="cpu"
                      placeholder="CPU"
                      value={inputValues.cpu}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">GPU</label>
                    <input
                      type="text"
                      name="gpu"
                      placeholder="GPU"
                      value={inputValues.gpu}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">OS</label>
                    <input
                      type="text"
                      name="os"
                      placeholder="Operating System"
                      value={inputValues.os}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Memory</label>
                    <input
                      type="text"
                      name="memory"
                      placeholder="Memory"
                      value={inputValues.memory}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Storage</label>
                    <input
                      type="text"
                      name="storage"
                      placeholder="Storage"
                      value={inputValues.storage}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Rear Camera Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    Rear Camera
                  </h2>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        No. of Cameras
                      </label>
                      <input
                        type="text"
                        name="rearCameraNo"
                        placeholder="No. of Cameras"
                        value={inputValues.rearCameraNo}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md outline-none w-96"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        Camera Features
                      </label>
                      <input
                        type="text"
                        name="rearCameraFeatures"
                        placeholder="Camera Features"
                        value={inputValues.rearCameraFeatures}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md outline-none w-96"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        Video Resolution
                      </label>
                      <input
                        type="text"
                        name="rearCameraVideo"
                        placeholder="Video Resolution"
                        value={inputValues.rearCameraVideo}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md outline-none w-96"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mt-3">
                    Front Camera
                  </h2>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        Camera Resolution
                      </label>
                      <input
                        type="text"
                        name="frontCameraMegaPixels"
                        placeholder="Camera Resolution"
                        value={inputValues.frontCameraMegaPixels}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md outline-none w-96"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">
                        Video Resolution
                      </label>
                      <input
                        type="text"
                        name="frontCameraVideo"
                        placeholder="Video Resolution"
                        value={inputValues.frontCameraVideo}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md outline-none w-96"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Battery Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">Battery</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Type & Capacity
                    </label>
                    <input
                      type="text"
                      name="batteryTypeCapacity"
                      placeholder="Type & Capacity"
                      value={inputValues.batteryTypeCapacity}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Charging Adapter
                    </label>
                    <input
                      type="text"
                      name="chargingSpeed"
                      placeholder="Charging Adapter"
                      value={inputValues.chargingSpeed}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      USB Type
                    </label>
                    <input
                      type="text"
                      name="usbType"
                      placeholder="USB Type"
                      value={inputValues.usbType}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Security Sensors Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  Security Sensors
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      FingerPrint
                    </label>
                    <input
                      type="text"
                      name="fingerprint"
                      placeholder="FingerPrint"
                      value={inputValues.fingerprint}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Face Unlock
                    </label>
                    <input
                      type="text"
                      name="faceUnlock"
                      placeholder="Face Unlock"
                      value={inputValues.faceUnlock}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Other Sensors
                    </label>
                    <input
                      type="text"
                      name="otherSensors"
                      placeholder="Other Sensors"
                      value={inputValues.otherSensors}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Connectivity Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  Connectivity
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Network Version
                    </label>
                    <input
                      type="text"
                      name="networkVersion"
                      placeholder="Network Version"
                      value={inputValues.networkVersion}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Wifi Version
                    </label>
                    <input
                      type="text"
                      name="wifiVersion"
                      placeholder="Wifi Version"
                      value={inputValues.wifiVersion}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Bluetooth Version
                    </label>
                    <input
                      type="text"
                      name="bluetoothVersion"
                      placeholder="Bluetooth Version"
                      value={inputValues.bluetoothVersion}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Sim</label>
                    <input
                      type="text"
                      name="sim"
                      placeholder="Sim"
                      value={inputValues.sim}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>

              {/* Multimedia Section */}
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  Multimedia
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Speakers
                    </label>
                    <input
                      type="text"
                      name="speakers"
                      placeholder="Speakers"
                      value={inputValues.speakers}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Headphone Jack
                    </label>
                    <input
                      type="text"
                      name="headphoneJack"
                      placeholder="Headphone Jack"
                      value={inputValues.headphoneJack}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Audio Support
                    </label>
                    <input
                      type="text"
                      name="audioSupport"
                      placeholder="Audio Support"
                      value={inputValues.audioSupport}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Mic</label>
                    <input
                      type="text"
                      name="mic"
                      placeholder="Mic"
                      value={inputValues.mic}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md outline-none w-96"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Additional Features
                  </h2>
                  <input
                    type="text"
                    name="additionalFeatures"
                    placeholder="Additional Features"
                    value={inputValues.additionalFeatures}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md outline-none w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 pt-6 items-center">
            <button
              variant="gradient"
              type="submit"
              className="bg-cyan-500 text-white rounded-md py-2 px-6 hover:bg-cyan-600 transition-colors"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              Submit
            </button>
            {open && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white w-96 p-6 rounded-lg shadow-2xl text-center">
                  <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Does this device have Variants?
                  </h1>
                  <div className="flex justify-center gap-4 mt-4">
                    <NavLink
                      to="/deviceVariants"
                      className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Yes
                    </NavLink>
                    <NavLink
                      to="/dashboard"
                      className="px-5 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
                    >
                      No
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              className="bg-rose-500 text-white rounded-md py-2 px-6 hover:bg-rose-600 transition-colors"
              style={{ fontSize: "16px", fontWeight: 500 }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
