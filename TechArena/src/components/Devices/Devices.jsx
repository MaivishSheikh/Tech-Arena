import React from "react";
import mobileBG from "../../assets/mobileBG.jpg";
import { NavLink } from "react-router-dom"

export default function Devices({imgSrc, title, subtitle, link}) {
  return (
    <>
      <NavLink to={link}
        className="relative text-white pt-9 rounded-2xl w-96"
        style={{
          background: `url(${mobileBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "360px",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
        <p className="text-center text-sm font-medium mb-4">
          {subtitle}
        </p>
        <div className="relative flex items-center pb-2 justify-center">
          <img
            src={imgSrc}
            className="w-full h-auto object-contain"
          />
        </div>
      </NavLink>
    </>
  );
}
