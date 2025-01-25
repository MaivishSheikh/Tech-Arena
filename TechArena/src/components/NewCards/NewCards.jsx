import React from "react";
import phoneCard from "../../assets/phoneCard.png";
import mobile from "../../assets/mobile.png";
import phones from "../../assets/phones.png";
import Devices from "../Devices/Devices";
import laptop from '../../assets/laptop.png'
import laptops from '../../assets/laptops.png'
import tablet from '../../assets/tablet.png'
import tabA from '../../assets/tabA.png'
import tabD from '../../assets/tabD.png'
import allinone from '../../assets/allinone.png'
import tablets from '../../assets/tablets.png'
import i from '../../assets/i.png'
import { NavLink } from "react-router-dom";

const NewCards = () => {
  return (
    <div className="flex items-center justify-evenly py-5 bg-gray-100">
      <Devices imgSrc={mobile} title="TOP SMARTPHONES" subtitle="Feature-Rich Smartphones at Great Prices" link="/phones" />
      <Devices imgSrc={tabD} title="TOP TABLETS" subtitle="Feature-Rich Smartphones at Great Prices" />
      <Devices imgSrc={laptops} title="TOP LAPTOPS" subtitle="Feature-Rich Smartphones at Great Prices" />
      <Devices imgSrc={i} title="FIND YOUR DEVICE" subtitle="Feature-Rich Smartphones at Great Prices" />
    </div>
  );
};

export default NewCards;
