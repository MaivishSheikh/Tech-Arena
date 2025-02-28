import React from "react";
import mobileBG from "../../assets/mobileBG.jpg";
import mobile from "../../assets/mobile.png";
import laptops from "../../assets/laptops.png";
import tabD from "../../assets/tabD.png";
import i from "../../assets/i.png";
import { NavLink } from "react-router-dom";

const deviceData = [
  {
    imgSrc: mobile,
    title: "TOP SMARTPHONES",
    subtitle: "Feature-Rich Smartphones at Great Prices",
    link: "/deviceShowcase/Phone",
    category: "Phone"
  },
  {
    imgSrc: tabD,
    title: "TOP TABLETS",
    subtitle: "Feature-Rich Tablets for Work & Play",
    link: "/deviceShowcase/All",
    category: "Tablet"
  },
  {
    imgSrc: laptops,
    title: "TOP LAPTOPS",
    subtitle: "Powerful Laptops for Every Need",
    link: "/deviceShowcase/Laptop",
    category: "Laptop"
  },
  {
    imgSrc: i,
    title: "FIND YOUR DEVICE",
    subtitle: "Explore & Find Your Perfect Match",
    link: "/deviceShowcase/All",
    category: "All"
  },
];

const NewCards = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-6 md:gap-3">
        {deviceData.map((device, index) => (
          <NavLink
            key={index}
            to={device.link}
            state={{ category: device.category }}
            className="relative text-white pt-9 rounded-2xl w-full max-w-sm mx-auto"
            style={{
              background: `url(${mobileBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className="text-3xl font-bold text-center xl:text-2xl lg:text-xl md:text-lg sm:text-2xl mb-2">
              {device.title}
            </h2>
            <p className="text-center text-sm font-medium lg:text-md md:text-md sm:text-md mb-4">
              {device.subtitle}
            </p>
            <div className="relative flex items-center pb-2 justify-center">
              <img
                src={device.imgSrc}
                className="w-full h-auto object-contain"
                alt={device.title}
              />
            </div>
          </NavLink>
        ))}
      </div>
      {/* <div style={{width: "1450px", margin: "auto", borderBottom: "1px solid black", padding: "10px 0"}} /> */}
    </>
  );
};

export default NewCards;
