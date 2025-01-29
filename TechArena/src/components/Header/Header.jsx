import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <header className="shadow-md">
        <div className="mx-auto px-4 flex justify-center items-center py-3 bg-slate-800 text-white" style={{background: "#072B3B"}}>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-semibold">TechArena</span>
          </div>
          <nav className="mx-10 flex justify-between items-center">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <div className="relative group">
                  <button className="hover:text-purple-400 flex justify-around items-center w-18">
                    Devices
                    <i class="fa-solid fa-sort-down"></i>
                  </button>
                  <div className="absolute hidden group-hover:block rounded-lg shadow-lg w-48 z-10 p-3">
                    <div className="absolute left-0 bg-cyan-900 text-gray-300 shadow-lg rounded-lg mt-2 py-5 w-64 z-50">
                      <ul className="flex flex-col">
                        <li>
                          <NavLink
                            to="/phones"
                            className="flex items-center px-4 py-2 hover:bg-slate-500  hover:text-white"
                          >
                            <div>
                              <h1>Phones</h1>
                              <p className="text-sm font-light">
                                Perfect phones, just for you
                              </p>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/phones"
                            className="flex items-center px-4 py-2 hover:bg-slate-500  hover:text-white"
                          >
                            <div>
                              <h1>Tablets</h1>
                              <p className="text-sm font-light">
                                Perfect tablets, made for you
                              </p>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/"
                            className="flex items-center px-4 py-2 hover:bg-slate-500  hover:text-white"
                          >
                            <div>
                              <h1>Laptops</h1>
                              <p className="text-sm font-light">
                                Perfect laptops, built for you
                              </p>
                            </div>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative group">
                  <button className="hover:text-purple-400 flex justify-around items-center w-18">
                    Services
                    <i class="fa-solid fa-sort-down"></i>
                  </button>
                  <div className="absolute hidden group-hover:block rounded-lg shadow-lg w-48 z-10 p-3">
                    <div className="absolute left-0 bg-cyan-900 text-gray-300 shadow-lg rounded-lg mt-2 py-5 w-64 z-50">
                      <ul className="flex flex-col">
                        <li>
                          <NavLink
                            to="/"
                            className="flex items-center px-4 py-2 hover:bg-slate-500  hover:text-white"
                          >
                            <div>
                              <h1>Reviews</h1>
                              <p className="text-sm font-light">
                                Ratings & Feedback
                              </p>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/"
                            className="flex items-center px-4 py-2 hover:bg-slate-500  hover:text-white"
                          >
                            <div>
                              <h1>Compare</h1>
                              <p className="text-sm font-light">
                                Side-by-Side Analysis
                              </p>
                            </div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/"
                            className="flex items-center px-4 py-2 hover:bg-slate-500  hover:text-white"
                          >
                            <div>
                              <h1>Find Your Perfect Device</h1>
                              <p className="text-sm font-light">
                                Discover Your Ideal Match
                              </p>
                            </div>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <NavLink to="/phones">Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/users">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/slider">Help</NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </a>
            <NavLink to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">Sign In</NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
