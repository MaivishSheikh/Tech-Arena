import React, { useState } from "react";

const PriceRange = ({ min, max, onChange }) => {
  const [range, setRange] = useState({ min: min, max: max });

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), range.max - 1);
    setRange((prev) => ({ ...prev, min: newMin }));
    onChange(newMin, range.max);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), range.min + 1);
    setRange((prev) => ({ ...prev, max: newMax }));
    onChange(range.min, newMax);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Price</h2>
      <div className="relative w-full h-6">
        {/* Track bar */}
        <div className="absolute top-1/2 left-0 h-1 bg-gray-300 w-full transform -translate-y-1/2"></div>
        
        {/* Selected range bar */}
        <div
          className="absolute top-1/2 h-1 bg-black transform -translate-y-1/2"
          style={{
            left: `${((range.min - min) / (max - min)) * 100}%`,
            width: `${((range.max - range.min) / (max - min)) * 100}%`,
          }}
        />
        
        {/* Min Range Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={range.min}
          onChange={handleMinChange}
          className="absolute top-2.5 left-0 w-full h-1 bg-transparent appearance-none"
          style={{ zIndex: 2 }}
        />
        
        {/* Max Range Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={range.max}
          onChange={handleMaxChange}
          className="absolute top-2.5 right-0 w-full h-1 bg-transparent appearance-none"
          style={{ zIndex: 2 }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span>₹ {range.min}</span>
        <span>₹ {range.max}</span>
      </div>
    </div>
  );
};

export default PriceRange;
