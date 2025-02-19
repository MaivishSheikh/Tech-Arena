import React from "react";
import Carousel from "../Carousel/Carousel";
import NewCards from "../NewCards/NewCards";
import Cards from "../Cards/Cards";
import Brands from "../Brands/Brands";

export default function Home(props) {
  return (
    <>
      <Carousel />
      <NewCards />
      <Cards />
      <Brands />
    </>
  );
}
