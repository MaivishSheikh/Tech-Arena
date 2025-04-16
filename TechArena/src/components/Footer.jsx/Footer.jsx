import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (event, brandTitle) => {
    event.preventDefault();
    navigate("/deviceShowcase", { state: { subCategory: brandTitle } });
  };

  return (
    <footer
      className="pt-12 pb-6 px-4"
      style={{ fontFamily: "Poppins", background: "#072B3B", color: "#F7F5FB" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex gap-8 mb-8">
          {/* Logo and About Section */}
          <div className="flex flex-col items-start">
            <div
              className="flex justify-start items-center"
              style={{
                fontFamily: "Iceberg",
                fontSize: "40px",
                fontWeight: 700,
              }}
            >
              <img src={logo} alt="" className="w-12 h-11 rounded-full" />
              <span className="ml-2">TechArena</span>
            </div>
            <p className="text-gray-400 mb-4" style={{ fontSize: "14px" }}>
              Your one-stop destination for all tech devices and accessories.
            </p>
            <div className="flex justify-evenly items-center gap-10">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i class="fa-brands fa-facebook fa-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i class="fa-brands fa-x-twitter fa-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i class="fa-brands fa-instagram fa-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i class="fa-brands fa-linkedin fa-xl"></i>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-3/4"
            style={{ fontFamily: "20px" }}
          >
            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <i className="fas fa-concierge-bell text-blue-400 mr-2"></i>
                Explore & Engage
              </h3>
              <ul className="space-y-2" style={{ fontSize: "14px" }}>
                <li>
                  <NavLink
                    to="/deviceShowcase/All"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-search text-xs mr-2"></i> Find your
                    Device
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-star text-xs mr-2"></i> Review
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-comment text-xs mr-2"></i> Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deviceShowcase/All"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-mobile text-xs mr-2"></i> Devices
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <i className="fas fa-question-circle text-blue-400 mr-2"></i>
                User Resources
              </h3>
              <ul className="space-y-2" style={{ fontSize: "14px" }}>
                <li>
                  <NavLink
                    to="/T&C?section=terms"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i class="fa-solid fa-file-contract fa-lg"></i>{" "}
                    <span className="mx-2">Terms of Service</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/T&C?section=payments"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fa-solid fa-money-bill" />{" "}
                    <span className="mx-2">Payments</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/T&C?section=shipping"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-truck mr-2"></i> Shipping
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/T&C?section=returns"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-undo text-xs mr-2"></i> Returns
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/T&C?section=faq"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <i className="fas fa-question text-xs mr-2"></i> FAQ
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <i className="fas fa-screwdriver-wrench text-blue-400 mr-2"></i>
                Tech Arena Tools
              </h3>
              <ul className="space-y-2" style={{ fontSize: "14px" }}>
                <li>
                  <NavLink
                    to="/sellerPage"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <i className="fas fa-store mr-1"></i> Become a Manufacturer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <i className="fas fa-bullhorn mr-1"></i> Advertise
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <i className="fas fa-gift mr-1"></i> Gift Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <i className="fas fa-headset mr-1"></i> Help Center
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p className="">support@techarena.com</p>
          </div>
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0"></div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TechArena.com | All Rights Reserved
          </div>
        </div>

        {/* Credits */}
        <div
          className="text-center mt-6 text-gray-500 text-sm"
          style={{ fontFamily: "Roboto", fontSize: "17px" }}
        >
          Developed by{" "}
          <span
            className="text-blue-400"
            style={{
              fontFamily: "Big Shoulders Stencil Text",
              fontSize: "25px",
              fontWeight: 700,
            }}
          >
            Maivish Sheikh
          </span>{" "}
          &{" "}
          <span
            className="text-blue-400"
            style={{
              fontFamily: "Big Shoulders Stencil Text",
              fontSize: "25px",
              fontWeight: 700,
            }}
          >
            Rishabh Gupta
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
