import { useState } from "react";

export default function FilterBar({ setFilters }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    devices: [],
    brands: [],
    subCategory: [],
    operatingSystem: [],
  });

  const brandOptions = {
    Phone: ["Samsung", "iPhone", "Vivo", "Oppo", "Xiaomi", "OnePlus"],
    Laptop: ["HP", "Dell", "Lenovo", "Asus", "Apple"],
    Tablet: ["Samsung", "Apple", "Lenovo"],
    All: ["Samsung", "iPhone", "Vivo", "Oppo", "Xiaomi", "OnePlus", "HP", "Dell", "Lenovo", "Asus", "Apple"],
  };

  const subCategoryOptions = {
    Phone: ["Gaming", "Photography", "5G", "Flagship", "Mid-Range"],
    Laptop: ["Gaming", "Content Creation", "Student & Office Work"],
    Tablet: ["Entertainment", "Student & Office Work"],
    All: ["Gaming", "Photography", "5G", "Flagship", "Mid-Range", "Content Creation", "Student & Office Work", "Entertainment"],
  };

  const osOptions = {
    Phone: ["Android", "iOS"],
    Laptop: ["Windows", "macOS", "Linux"],
    Tablet: ["Android", "iOS", "Windows"],
    All: ["Android", "iOS", "Windows", "macOS", "Linux"],
  };

  const categories = [
    {
      title: "Devices",
      key: "devices",
      options: ["Phone", "Tablet", "Laptop", "All"],
    },
    {
      title: "Brands",
      key: "brands",
      options: brandOptions[selectedFilters.devices[0]] || [],
    },
    {
      title: "Sub Category",
      key: "subCategory",
      options: subCategoryOptions[selectedFilters.devices[0]] || [],
    },
    {
      title: "Operating System",
      key: "operatingSystem",
      options: osOptions[selectedFilters.devices[0]] || [],
    },
  ];

  const handleOpen = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleFilterChange = (category, option) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };

      if (category === "devices") {
        updatedFilters = {
          devices: [option],
          brands: [],
          subCategory: [],
          operatingSystem: [],
        };
      } else {
        if (updatedFilters[category].includes(option)) {
          updatedFilters[category] = updatedFilters[category].filter((item) => item !== option);
        } else {
          updatedFilters[category].push(option);
        }
      }
      setFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({ devices: [], brands: [], subCategory: [], operatingSystem: [] });
    setFilters({ devices: [], brands: [], subCategory: [], operatingSystem: [] });
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
                      type={category.key === "devices" ? "radio" : "checkbox"}
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
