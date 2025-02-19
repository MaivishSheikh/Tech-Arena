import { useState } from "react";

export default function FilterBar({ setFilters }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    subCategory: [],
    operatingSystem: [],
  });

  const categories = [
    {
      title: "Brands",
      key: "brands",
      options: ["Samsung", "iPhone", "Vivo", "Oppo", "Xiaomi", "OnePlus"],
    },
    {
      title: "Sub Category",
      key: "subCategory",
      options: ["Gaming", "Content Creation", "5G", "Photography", "Mid-Range", "Flagship"],
    },
    {
      title: "Operating System",
      key: "operatingSystem",
      options: ["Android", "iOS"],
    },
  ];

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

  const clearFilters = () => {
    setSelectedFilters({
      brands: [],
      subCategory: [],
      operatingSystem: [],
      price: []
    });
    setFilters({
      brands: [],
      subCategory: [],
      operatingSystem: [],
      price: []
    });
  };

  return (
    <div className="w-max p-4 border-gray-300">
      <ul className="w-64 border rounded-md bg-white">
        {categories.map((category, index) => (
          <li key={index} className="p-3 cursor-pointer border-b">
            <div
              className="flex justify-between items-center"
              onClick={() => handleOpen(index)}
            >
              <h1 className="text-lg font-bold">{category.title}</h1>
              <span className={`transform duration-500 ${openCategory === index ? "-rotate-90" : ""}`}>
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <ul
              className={`mt-2 overflow-hidden transition-all duration-1000 ease-in-out ${
                openCategory !== index ? "max-h-96" : "max-h-0"
              }`}
            >
              {category.options.map((option, idx) => (
                <li key={idx} className="pl-6 p-2 cursor-pointer flex items-center">
                  <label className="flex items-center space-x-2 w-full cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedFilters[category.key].includes(option)}
                      onChange={() => handleFilterChange(category.key, option)}
                    />
                    <span className="text-gray-700 px-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full hover:bg-red-600"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
