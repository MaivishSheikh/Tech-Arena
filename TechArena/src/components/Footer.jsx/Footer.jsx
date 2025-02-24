import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    
    const handleNavigation = (event, brandTitle) => {
        event.preventDefault();
        navigate("/deviceShowcase", { state: { subCategory: brandTitle } });
      };

  return (
    <footer
      className="bg-gray-900 text-gray-300 p-6"
      style={{ background: "#072B3B" }}
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {/* About Section */}
        <div>
          <h3 className="text-white font-semibold mb-2" style={{fontFamily: "Ubuntu", fontWeight: 500, fontSize: "20px"}}>SERVICES</h3>
          <ul className="grid grid-rows-3 grid-cols-2 text-md" style={{fontFamily: "Ubuntu", fontWeight: 500}}>
            <li className="cursor-pointer">Find your Device</li>
            <li className="cursor-pointer">Review</li>
            <li className="cursor-pointer">Feedback</li>
            <li className="cursor-pointer">Devices</li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-white font-semibold mb-2" style={{fontFamily: "Ubuntu", fontWeight: 500, fontSize: "20px"}}>HELP</h3>
          <ul className="grid grid-rows-3 grid-cols-2 text-md" style={{fontFamily: "Ubuntu", fontWeight: 500}}>
            <li className="cursor-pointer">Payments</li>
            <li className="cursor-pointer">Shipping</li>
            <li className="cursor-pointer">Cancellation & Returns</li>
            <li className="cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Group Companies */}
        <div>
          <h3 className="text-white font-semibold mb-2" style={{fontFamily: "Ubuntu", fontWeight: 500, fontSize: "20px"}}>BRANDS</h3>
          <ul className="grid grid-rows-3 grid-cols-2 text-md" style={{fontFamily: "Ubuntu", fontWeight: 500}}>
            <li className="cursor-pointer">
              <NavLink
                onClick={(event) => handleNavigation(event, "Samsung")}
              >
                Samsung
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                onClick={(event) => handleNavigation(event, "Apple")}
              >
                Apple
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                onClick={(event) => handleNavigation(event, "Xiaomi")}
              >
                Xiaomi
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                onClick={(event) => handleNavigation(event, "Lenovo")}
              >
                Lenovo
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                onClick={(event) => handleNavigation(event, "HP")}
              >
                HP
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h3 className="text-white font-semibold mb-2" style={{fontFamily: "Ubuntu", fontWeight: 500, fontSize: "20px"}}>CONSUMER POLICY</h3>
          <ul className="grid grid-rows-3 grid-cols-2 text-md" style={{fontFamily: "Ubuntu", fontWeight: 500}}>
            <li className="cursor-pointer">Cancellation & Returns</li>
            <li className="cursor-pointer">Terms Of Use</li>
            <li className="cursor-pointer">Security</li>
            <li className="cursor-pointer">Privacy</li>
            <li className="cursor-pointer">Sitemap</li>
          </ul>
        </div>
      </div>

      {/* Address and Social Links */}
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between text-sm">
        <div>
          <h3 className="text-white font-semibold">Mail Us:</h3>
          <p>TechArena Private Limited,</p>
          <p>National Post Graduate college,</p>
          <p>Hazratganj, Lucknow, Uttar Pradesh, India</p>
        </div>

        <div>
          <h3 className="text-white font-semibold">Social:</h3>
          <div className="flex space-x-4 mt-2">
            <i
              class="fa-brands fa-facebook fa-lg"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              class="fa-brands fa-twitter fa-lg"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              class="fa-brands fa-instagram fa-lg"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              class="fa-brands fa-youtube fa-lg"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between text-sm text-gray-400">
        <div className="flex space-x-6">
          <p>Become a Seller</p>
          <p>Advertise</p>
          <p>Gift Cards</p>
          <p>Help Center</p>
        </div>
        <p>© 2025 TechArena.com | All Rights Reserved.</p>
      </div>
      <div className="text-white font-semibold mb-2 text-center">
        <p className="mt-3">
          Developed by <strong>Maivish Sheikh</strong> & <strong>Rishabh Gupta</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
