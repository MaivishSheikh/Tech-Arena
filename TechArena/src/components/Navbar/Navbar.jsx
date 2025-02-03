import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/devices/${searchQuery}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="bg-[#0a0e29] text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <NavLink to="/" className="ml-1">
            TechArena
          </NavLink>
        </div>

        <ul className="hidden md:flex space-x-6 items-center">
          <li className="hover:text-gray-400 cursor-pointer">Home</li>
          <li className="hover:text-gray-400 cursor-pointer">About Us</li>

          <li
            className="relative group"
            onMouseEnter={() => setDropdown("devices")}
            onMouseLeave={() => setDropdown("")}
          >
            <span className="flex items-center cursor-pointer">
              Devices <i className="fa-solid fa-chevron-down ml-1"></i>
            </span>
            {dropdown === "devices" && (
              <ul className="absolute left-0 top-full mt-1 bg-white text-black shadow-lg py-2 w-60 rounded-md z-50">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <NavLink to="/phones" className="flex items-center hover:text-white">
                    <div>
                      <h1>Phones</h1>
                      <p className="text-sm font-light">Perfect phones, just for you</p>
                    </div>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setDropdown("blog")}
            onMouseLeave={() => setDropdown("")}
          >
            <span className="flex items-center cursor-pointer">
              Blog <i className="fa-solid fa-chevron-down ml-1"></i>
            </span>
            {dropdown === "blog" && (
              <ul className="absolute left-0 top-full mt-1 bg-white text-black shadow-lg py-2 w-48 rounded-md z-50">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Tech News</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Tutorials</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Industry Trends</li>
              </ul>
            )}
          </li>

          <li className="hover:text-gray-400 cursor-pointer">Contact</li>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search here..."
              className="px-3 py-1 rounded-md bg-gray-800 text-white outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-1 rounded-md bg-blue-600 text-white"
            >
              Search
            </button>
          </div>
        </ul>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <i className="fa-solid fa-x text-2xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-2xl"></i>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <ul className="md:hidden bg-[#0a0e29] p-4 space-y-2">
          <li className="hover:text-gray-400 cursor-pointer">Home</li>
          <li className="hover:text-gray-400 cursor-pointer">About Us</li>

          <li
            className="cursor-pointer flex justify-between"
            onClick={() => setDropdown(dropdown === "devices" ? null : "devices")}
          >
            Devices <i className="fa-solid fa-chevron-down"></i>
          </li>
          {dropdown === "devices" && (
            <ul className="bg-white text-black py-2 rounded-md">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <NavLink to="/phones" className="block">Phones</NavLink>
              </li>
            </ul>
          )}

          <li
            className="cursor-pointer flex justify-between"
            onClick={() => setDropdown(dropdown === "blog" ? null : "blog")}
          >
            Blog <i className="fa-solid fa-chevron-down"></i>
          </li>
          {dropdown === "blog" && (
            <ul className="bg-white text-black py-2 rounded-md">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Tech News</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Tutorials</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Industry Trends</li>
            </ul>
          )}

          <li className="hover:text-gray-400 cursor-pointer">Contact</li>
          
          <div className="flex">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full px-3 py-1 rounded-md bg-gray-800 text-white outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-1 rounded-md bg-blue-600 text-white"
            >
              Search
            </button>
          </div>
        </ul>
      )}
    </nav>
  );
}
