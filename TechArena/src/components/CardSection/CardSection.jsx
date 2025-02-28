import React from "react";
import { NavLink } from "react-router-dom";

export default function CardSection({
  title,
  value,
  iconClass,
  iconColor,
  viewLink,
  addLink,
  upLink,
}) {
  return (
    <>
      <div
        className="p-4 rounded-2xl shadow-md bg-white"
        style={{ width: "320px" }}
      >
        <div className="flex justify-between items-center">
          <h3
            className="text-gray-500"
            style={{ fontFamily: "Ubuntu", fontSize: "17px" }}
          >
            {title}
          </h3>
          <NavLink
            to={viewLink}
            className={`py-2 px-3 rounded-lg`}
            style={{ background: iconColor }}
          >
            <i
              className={`${iconClass} text-white`}
              style={{ background: iconColor }}
            ></i>
          </NavLink>
        </div>
        <div
          className="mx-5 my-3"
          style={{ fontSize: "30px", fontWeight: 700 }}
        >
          {value}
        </div>
        <div
          className="flex justify-evenly items-center gap-2 text-white"
          style={{ fontFamily: "Ubuntu", fontSize: "14px", fontWeight: 600 }}
        >
          <NavLink
            to={addLink}
            className={`px-5 py-2 rounded-lg text-center`}
            style={{ background: iconColor }}
          >
            Add {title}
          </NavLink>
          <NavLink
            to={upLink}
            className={`px-5 py-2 rounded-lg text-center`}
            style={{ background: iconColor }}
          >
            Update {title}
          </NavLink>
        </div>
      </div>
    </>
  );
}
