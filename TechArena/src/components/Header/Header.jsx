import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
  
    loadUser();
    window.addEventListener("storage", loadUser);
  
    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

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
    <header>
      <div
        className="mx-auto px-4 flex justify-between py-2 items-center bg-slate-800 text-white"
        style={{ background: "#072B3B" }}
      >
        <div
          style={{ fontFamily: "Ubuntu", fontSize: "30px", fontWeight: 700 }}
        >
          <NavLink to="/">TechArena</NavLink>
        </div>
        <nav className="mx-10 flex justify-between items-center">
          <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <div className="relative group">
                <button className="hover:text-purple-400 flex justify-evenly items-center w-18">
                  <span>Devices</span>
                  <i className="fa-solid fa-chevron-down fa-sm ml-2"></i>
                </button>
                <div className="absolute hidden group-hover:block rounded-lg w-48 z-10 p-3">
                  <div className="absolute left-0 bg-cyan-900 text-gray-300 rounded-lg py-2 -mt-2 w-64 z-50">
                    <ul className="flex flex-col">
                      <li>
                        <NavLink
                          to="/deviceShowcase/Phone"
                          className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white"
                        >
                          Phones
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/deviceShowcase/All`}
                          className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white"
                        >
                          Tablets
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/deviceShowcase/Laptop"
                          className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white"
                        >
                          Laptops
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/deviceShowcase/All`}
                          className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white"
                        >
                          All Devices
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="relative group">
                <button className="hover:text-purple-400 flex justify-evenly items-center w-18">
                  <span>Services</span>
                  <i className="fa-solid fa-chevron-down fa-sm ml-2"></i>
                </button>
                <div className="absolute hidden group-hover:block rounded-lg w-48 z-10 p-3">
                  <div className="absolute left-0 bg-cyan-900 text-gray-300 rounded-lg py-2 -mt-2 w-64 z-50">
                    <ul className="flex flex-col">
                      <li>
                        <NavLink
                          to="/deviceShowcase"
                          className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white"
                        >
                          Find Your Device
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/compareDevice"
                          className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white"
                        >
                          Compare
                        </NavLink>
                      </li>
                      {/* <li><NavLink to="/laptops" className="flex items-center px-4 py-2 hover:bg-slate-500 hover:text-white">Laptops</NavLink></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/reviews">Reviews</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/help">Help</NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search devices..."
              className="px-3 py-1 rounded-md bg-gray-800 text-white outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-2 py-1 rounded-md bg-blue-600 text-white"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(`/users/${user.username}`)}>
                <i className="fa-solid fa-circle-user fa-2xl" style={{padding: "0 20px"}}></i>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
