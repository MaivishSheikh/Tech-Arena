import React from "react";
import mobile from "../../assets/mobile.png";
import Devices from "../Devices/Devices";
import laptops from '../../assets/laptops.png'
import tabD from '../../assets/tabD.png'
import i from '../../assets/i.png'

const NewCards = () => {
  return (
    <div className="flex items-center justify-evenly gap-1 py-5 bg-gray-100">
      <Devices imgSrc={mobile} title="TOP SMARTPHONES" subtitle="Feature-Rich Smartphones at Great Prices" link="/phones" />
      <Devices imgSrc={tabD} title="TOP TABLETS" subtitle="Feature-Rich Smartphones at Great Prices" />
      <Devices imgSrc={laptops} title="TOP LAPTOPS" subtitle="Feature-Rich Smartphones at Great Prices" />
      <Devices imgSrc={i} title="FIND YOUR DEVICE" subtitle="Feature-Rich Smartphones at Great Prices" />
    </div>
  );
};

export default NewCards;
