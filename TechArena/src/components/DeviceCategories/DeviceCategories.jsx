import React from 'react';
import CardSection from '../CardSection/CardSection';
import cardA from "../../assets/cardA.png";
import cardB from "../../assets/cardB.jpg";
import cardC from "../../assets/cardC.png";
import cardD from "../../assets/cardD.png";
import laptopCardA from "../../assets/laptopCardA.jpg"
import laptopCardB from "../../assets/laptopCardB.jpg"
import laptopCardC from "../../assets/laptopCardC.jpg"
import laptopCardD from "../../assets/laptopCardD.jpg"
import phoneCardA from "../../assets/phoneCardA.jpg"
import phoneCardB from "../../assets/phoneCardB.jpg"
import phoneCardC from "../../assets/phoneCardC.jpg"
import phoneCardD from "../../assets/phoneCardD.jpg"
import { NavLink } from 'react-router-dom';

const DeviceCategories = () => {
  const phonePicksCards = [
    { imgSrc: phoneCardA, title: "Content Creation", link: "https://google.com" },
    { imgSrc: phoneCardB, title: "Gaming", link: "https://twitter.com" },
    { imgSrc: phoneCardC, title: "Professional" },
    { imgSrc: phoneCardD },
  ];

  const touchscreenTroveCards = [
    { imgSrc: cardA, title: "Graphic Designing" },
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
    <div className="flex justify-evenly gap-4 p-4 bg-slate-700">
      <CardSection title="Ultimate Phone Picks" cards={phonePicksCards} bgColor="bg-emerald-300" />
      <CardSection title="The Touchscreen Treasure Trove" cards={touchscreenTroveCards} bgColor="bg-rose-300" />
      <CardSection title="Portable Performance Picks" cards={portablePerformanceCards} bgColor="bg-orange-300" />
    </div>
  );
};

export default DeviceCategories;