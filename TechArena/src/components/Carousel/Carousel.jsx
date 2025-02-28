import React, { useState, useEffect } from "react";
import A from "../../assets/A.jpeg";
import B from "../../assets/B.jpeg";
import C from "../../assets/C.jpg";
import { NavLink } from "react-router-dom";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides] = useState([
    {
      image: A,
      title: "Phones Built For Every Lifestyle",
      description:
        "Explore top-performing smartphones crafted for gaming, photography, and seamless everyday use.",
      btnTxt: "Explore Phones",
      link: "/deviceShowcase/Phone",
    },
    {
      image: B,
      title: "Tablets That Elevate Your Experience",
      description:
        "Seamlessly balance work and play with powerful tablets designed for multitasking, creativity, and entertainment on the go.",
      btnTxt: "Explore Tablets",
      link: "/deviceShowcase/All",
    },
    {
      image: C,
      title: "Laptops Made For Every Journey",
      description:
        "Whether for gaming, productivity, or creativity, find laptops that deliver exceptional performance and style to suit your needs.",
      btnTxt: "Explore Laptops",
      link: "/deviceShowcase/Laptop",
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative">
      <div
        className="w-full overflow-hidden duration-3000 ease-in"
        style={{ height: "500px", position: "relative" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "#00000073", zIndex: 1 }}
        />
        <img
          src={slides[activeIndex].image}
          alt={`Slide ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div className="absolute left-32 top-32 text-white">
            <h3
              style={{
                fontFamily: "Big Shoulders Stencil Text",
                fontSize: "60px",
                width: "400px",
                lineHeight: 1.3,
              }}
            >
              {slides[activeIndex].title}
            </h3>
            <p
              className="text-md my-3 mb-8"
              style={{ fontFamily: "Ubuntu", width: "400px" }}
            >
              {slides[activeIndex].description}
            </p>
            <NavLink
              to={slides[activeIndex].link}
              className="bg-blue-900 hover:bg-blue-600 text-lg px-4 py-2.5 rounded-xl inline-block my-1"
              style={{fontFamily: "Ubuntu", fontWeight: 700}}
            >
              {slides[activeIndex].btnTxt}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
