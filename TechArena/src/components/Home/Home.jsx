import React from "react";
import Carousel from "../Carousel/Carousel";
import NewCards from "../NewCards/NewCards";
import Cards from "../Cards/Cards";

export default function Home(props) {
  return (
    <>
      <Carousel />
      <NewCards />
      <h1 className="text-center text-3xl my-5 underline" style={{fontFamily: "Ubuntu", fontWeight: 800}}>Popular Devices</h1>
      <Cards />
    </>
  );
}
