import React from "react";
import Carousel from "../Carousel/Carousel";
import NewCards from "../NewCards/NewCards";
import Cards from "../Cards/Cards";
import PhoneBrands from "../PhoneBrands/PhoneBrands";

export default function Home(props) {
  return (
    <>
      <Carousel />
      <NewCards />
      <Cards />
      <PhoneBrands />
    </>
  );
}
