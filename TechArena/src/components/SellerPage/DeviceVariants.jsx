import { useState } from "react";

const DeviceVariants = () => {
  const [brandModel, setBrandModel] = useState("");
  const [deviceType, setDeviceType] = useState("phone");
  const [variants, setVariants] = useState([]);
  const [priceError, setPriceError] = useState("");

  const ramOptions = {
    phone: ["4GB", "6GB", "8GB", "12GB", "16GB"],
    tablet: ["4GB", "6GB", "8GB"],
    laptop: ["8GB", "16GB", "32GB", "64GB"],
  };

  const storageOptions = {
    phone: ["64GB", "128GB", "256GB", "512GB", "1TB"],
    tablet: ["64GB", "128GB", "256GB", "512GB"],
    laptop: ["256GB", "512GB", "1TB", "2TB"],
  };

  const addVariant = () => {
    setVariants([...variants, { ram: "", storage: "", color: "", price: "" }]);
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setVariants(updatedVariants);

    if (field === "price") {
      validatePrice(value, index);
    }
  };

  const validatePrice = (price, index) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      setPriceError(`Invalid price at variant ${index + 1}. Price must be a number.`);
    } else {
      setPriceError("");
    }
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!brandModel) {
      alert("Please enter a device model.");
      return;
    }

    if (variants.length === 0) {
      alert("Please add at least one variant.");
      return;
    }

    for (const variant of variants) {
      if (!variant.ram || !variant.storage || !variant.color || !variant.price) {
        alert("Please fill all fields for every variant.");
        return;
      }

      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(variant.price)) {
        alert(`Invalid price in variant. Price must be a number.`);
        return;
      }
    }

    try {
      for (const variant of variants) {
        const response = await fetch("http://localhost:8000/api/v1/deviceVariants/addVariants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceName: brandModel,
            memory: variant.ram,
            storage: variant.storage,
            colorAvailable: variant.color,
            price: variant.price,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Error Response:", errorData);
          throw new Error(errorData || "Failed to add variant");
        }

        const data = await response.json();
        console.log("Variant added successfully:", data);
      }

      alert("All variants added successfully!");
      navigate("/dashboard");
      setVariants([]);
      setBrandModel("");
    } catch (error) {
      console.error("Error adding variants:", error);
    }
  };

  return (
    <div className="p-4 mx-auto space-y-4" style={{ width: "1200px" }}>
      <div>
        <h1 className="text-2xl font-bold">Add Device Variants</h1>
        <p className="text-gray-600">All devices have multiple varieties, so add all the variants here.</p>
      </div>

      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="phone"
            checked={deviceType === "phone"}
            onChange={() => setDeviceType("phone")}
            className="form-radio"
          />
          <span>Phone</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="tablet"
            checked={deviceType === "tablet"}
            onChange={() => setDeviceType("tablet")}
            className="form-radio"
          />
          <span>Tablet</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="laptop"
            checked={deviceType === "laptop"}
            onChange={() => setDeviceType("laptop")}
            className="form-radio"
          />
          <span>Laptop</span>
        </label>
      </div>

      <input
        type="text"
        placeholder="Enter Device Name"
        value={brandModel}
        onChange={(e) => setBrandModel(e.target.value)}
        className="border p-2 rounded-md w-full"
      />

      <button
        onClick={addVariant}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Variant
      </button>

      <div className="grid grid-cols-4 gap-4">
        {variants.map((variant, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2">
            <select
              value={variant.ram}
              onChange={(e) => updateVariant(index, "ram", e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select RAM</option>
              {ramOptions[deviceType].map((ram) => (
                <option key={ram} value={ram}>
                  {ram}
                </option>
              ))}
            </select>

            <select
              value={variant.storage}
              onChange={(e) => updateVariant(index, "storage", e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Storage</option>
              {storageOptions[deviceType].map((storage) => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Color"
              value={variant.color}
              onChange={(e) => updateVariant(index, "color", e.target.value)}
              className="border p-2 rounded-md w-full"
            />

            <input
              type="text"
              placeholder="Price"
              value={variant.price}
              onChange={(e) => updateVariant(index, "price", e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            {priceError && index === variants.length - 1 && (
              <p className="text-red-500 text-sm">{priceError}</p>
            )}

            <button
              onClick={() => removeVariant(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md w-full hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {variants.length > 0 && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded-md block mx-auto hover:bg-green-600"
        >
          Submit Variants
        </button>
      )}
    </div>
  );
};

export default DeviceVariants;