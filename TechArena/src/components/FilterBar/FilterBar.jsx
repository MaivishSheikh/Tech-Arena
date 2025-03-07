import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PriceRange from "../PriceRange/PriceRange";

const getFilteredBrands = (pathname) => {
  if (pathname.includes("/deviceShowcase/Phone")) {
    return ["Samsung", "iPhone", "Vivo", "Oppo", "Xiaomi", "OnePlus", "Realme"];
  } else if (pathname.includes("/deviceShowcase/Tablet")) {
    return ["Samsung", "iPad", "Xiaomi", "OnePlus", "Redmi"];
  } else if (pathname.includes("/deviceShowcase/Laptop")) {
    return ["HP", "Lenovo", "Dell", "iMac", "Asus", "Acer"];
  } else if (pathname.includes("/deviceShowcase/All")) {
    return ["Samsung", "iPhone", "iMac", "HP", "Vivo", "Xiaomi", "Oppo", "Lenovo", "Acer", "Asus", "Realme", "OnePlus", "Redmi", "iPad", "Dell"];
  }
  return ["Samsung", "iPhone", "Vivo", "Oppo", "Xiaomi", "OnePlus", "HP"];
};

export default function FilterBar({ setFilters }) {
  const location = useLocation();
  const filteredBrands = useMemo(() => getFilteredBrands(location.pathname), [location.pathname]);
  
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    devices: [],
    brands: [],
    subCategory: [],
    operatingSystem: [],
    price: [1000, 50000],
  });
  
  const [expandedCategories, setExpandedCategories] = useState({});
  const categoryRefs = useRef({});

  useEffect(() => {
    const newExpandedState = {};
    Object.entries(categoryRefs.current).forEach(([key, ref]) => {
      if (ref?.scrollHeight > 250) {
        newExpandedState[key] = false;
      }
    });
    setExpandedCategories(newExpandedState);
  }, [filteredBrands]);

  const handleOpen = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleFilterChange = (category, option) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(option)) {
        updatedFilters[category] = updatedFilters[category].filter((item) => item !== option);
      } else {
        updatedFilters[category].push(option);
      }
      setFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const toggleExpand = (categoryKey) => {
    setExpandedCategories((prev) => ({ ...prev, [categoryKey]: !prev[categoryKey] }));
  };

  const categories = [
    ...(location.pathname.includes("/deviceShowcase/All")
      ? [{ title: "Devices", key: "devices", options: ["Phone", "Tablet", "Laptop", "All"] }]
      : []),
    { title: "Brands", key: "brands", options: filteredBrands },
    { title: "Sub Category", key: "subCategory", options: ["Gaming", "Content Creation", "5G", "Photography", "Mid-Range", "Flagship", "Student & Office Work"] },
    { title: "Operating System", key: "operatingSystem", options: ["Android", "iOS", "Windows"] },
  ];

  return (
    <div className="w-max p-4 border-gray-300">
      <ul className="w-64 border rounded-md bg-white">
        {categories.map((category, index) => (
          <li key={index} className="p-3 cursor-pointer border-b">
            <div className="flex justify-between items-center" onClick={() => handleOpen(index)}>
              <h1 className="text-lg font-bold">{category.title}</h1>
              <span className={`transform duration-500 ${openCategory === index ? "-rotate-90" : ""}`}>
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div ref={(el) => (categoryRefs.current[category.key] = el)}
                 className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${expandedCategories[category.key] ? "max-h-full" : "max-h-60"}`}>
              <ul>
                {category.options.map((option, idx) => (
                  <li key={idx} className="pl-6 p-2 cursor-pointer flex items-center">
                    <label className="flex items-center space-x-2 w-full cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" checked={selectedFilters[category.key].includes(option)}
                             onChange={() => handleFilterChange(category.key, option)} />
                      <span className="text-gray-700 px-2">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {categoryRefs.current[category.key]?.scrollHeight > 250 && (
              <button onClick={() => toggleExpand(category.key)} className="mt-2 text-blue-500 hover:underline text-sm">
                {expandedCategories[category.key] ? "Show Less" : "Show More"}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full hover:bg-red-600" onClick={() => setFilters({ devices: [], brands: [], subCategory: [], operatingSystem: [], price: [1000, 50000] })}>
        Clear Filters
      </button>
    </div>
  );
}