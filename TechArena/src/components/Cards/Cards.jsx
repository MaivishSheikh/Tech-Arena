import React from "react";
import A from "../../assets/A.jpeg"
import { NavLink } from "react-router-dom";

export default function Cards({
  imgSrc = A,
  title = "phones",
  link = "/devices"
}) {
  return (
    <>
      <div className="bg-white border h-max w-max border-gray-200 rounded-lg shadow hover:shadow-lg p-2">
        <NavLink to={link}>
        <img src={imgSrc} alt="" className="rounded-t-lg" style={{height: "130px", width: "200px"}} />
        <div className="p-2">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
        </NavLink>
        
      </div>
    </>
  );
}
