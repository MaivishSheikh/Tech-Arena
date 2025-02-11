import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import samsung from "../../assets/Logo Images/samsung.png";
import apple from "../../assets/Logo Images/apple.png";
import oneplus from "../../assets/Logo Images/oneplus.png";
import xiaomi from "../../assets/Logo Images/xiaomi.png";
import oppo from "../../assets/Logo Images/oppo.png";
import vivo from "../../assets/Logo Images/vivo.png";

export default function PhoneBrands() {
  const navigate = useNavigate();

  const handleNavigation = (event, subCategory) => {
    event.preventDefault();
    navigate("/phones", { state: { subCategory: subCategory } });
  };

  return (
    <>
      <div>
        <h1
          className="text-center text-3xl mt-10 mb-5"
          style={{ fontFamily: "Ubuntu", fontWeight: 800 }}
        >
          Shop By Brands
        </h1>
        <div
          className="flex justify-evenly items-center mb-10"
        >
          <NavLink onClick={(event) => handleNavigation(event, "Samsung")}>
            <img
              src={samsung}
              alt="Samsung"
              className="transition-transform transform hover:scale-105"
              style={{ width: "170px", height: "40px", cursor: "pointer" }}
            />
          </NavLink>
          <NavLink onClick={(event) => handleNavigation(event, "iPhone")}>
            <img
              src={apple}
              alt="iPhone"
              className="transition-transform transform hover:scale-105"
              style={{ width: "70px", height: "70px", cursor: "pointer" }}
            />
          </NavLink>
          <NavLink onClick={(event) => handleNavigation(event, "Vivo")}>
            <img
              src={vivo}
              alt="Vivo"
              className="transition-transform transform hover:scale-105"
              style={{ width: "170px", height: "50px", cursor: "pointer" }}
            />
          </NavLink>
          <NavLink onClick={(event) => handleNavigation(event, "Oppo")}>
            <img
              src={oppo}
              alt="Oppo"
              className="transition-transform transform hover:scale-105"
              style={{ width: "170px", height: "50px", cursor: "pointer" }}
            />
          </NavLink>
          <NavLink onClick={(event) => handleNavigation(event, "Xiaomi")}>
            <img
              src={xiaomi}
              alt="Xiaomi"
              className="transition-transform transform hover:scale-105"
              style={{ width: "70px", height: "70px", cursor: "pointer" }}
            />
          </NavLink>
          <NavLink onClick={(event) => handleNavigation(event, "OnePlus")}>
            <img
              src={oneplus}
              alt="OnePlus"
              className="transition-transform transform hover:scale-105"
              style={{ width: "70px", height: "70px", cursor: "pointer" }}
            />
          </NavLink>
        </div>
      </div>
    </>
  );
}
