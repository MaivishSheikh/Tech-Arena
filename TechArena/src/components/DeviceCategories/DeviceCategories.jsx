import React from "react";
import CardSection from "../CardSection/CardSection";
import cardA from "../../assets/cardA.png";
import cardB from "../../assets/cardB.jpg";
import cardC from "../../assets/cardC.png";
import cardD from "../../assets/cardD.png";
import laptopCardA from "../../assets/laptopCardA.jpg";
import laptopCardB from "../../assets/laptopCardB.jpg";
import laptopCardC from "../../assets/laptopCardC.jpg";
import laptopCardD from "../../assets/laptopCardD.jpg";
import phoneA from "../../assets/phoneA.png";
import phoneCardB from "../../assets/phoneCardB.jpg";
import phoneCardC from "../../assets/phoneCardC.jpg";
import phoneCardD from "../../assets/phoneCardD.jpg";
import bgA from "../../assets/bgA.jpeg"
import bgB from "../../assets/bgB.jpeg"
import bgC from "../../assets/bgC.jpeg"
import bgD from "../../assets/bgD.jpeg"
import { NavLink } from "react-router-dom";

const DeviceCategories = () => {
  const phonePicksCards = [
    { imgSrc: phoneA, title: "Content Creation", link: "/phones" },
    { imgSrc: phoneCardB, title: "Gaming", link: "/phones" },
    { imgSrc: phoneCardC, title: "Professional" },
    { imgSrc: phoneCardD },
  ];

  const touchscreenTroveCards = [
    { imgSrc: cardA, title: "Graphic Designing", link: "/devices" },
    { imgSrc: cardB, title: "Content Creation" },
    { imgSrc: cardC },
    { imgSrc: cardD },
  ];

  const portablePerformanceCards = [
    { imgSrc: laptopCardA },
    { imgSrc: laptopCardB, title: "AI Integration" },
    { imgSrc: laptopCardC, title: "Gaming Laptops" },
    { imgSrc: laptopCardD, title: "Foldable Laptops" },
  ];

  return (
    <div
      className="flex justify-evenly gap-4 px-4 py-10"
      style={{
        // background: `linear-gradient(to left, #073B3A, #0B6E4F)`,
        background: "#0B586E",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat"

      }}
    >
      <CardSection
        title="Ultimate Phone Picks"
        cards={phonePicksCards}
        bgColor="bg-emerald-300"
      />
      <CardSection
        title="The Touchscreen Treasure Trove"
        cards={touchscreenTroveCards}
        bgColor="bg-rose-300"
      />
      <CardSection
        title="Portable Performance Picks"
        cards={portablePerformanceCards}
        bgColor="bg-orange-300"
      />
    </div>
  );
};

export default DeviceCategories;
