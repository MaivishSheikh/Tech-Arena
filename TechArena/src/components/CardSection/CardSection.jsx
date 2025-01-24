import React from 'react';
import Cards from "../Cards/Cards";
import { NavLink } from 'react-router-dom';

const CardSection = ({ title, cards, bgColor }) => {
  return (
    <div
    className="bg-black/20 backdrop-blur-xl border-white/60 border-2 rounded-xl shadow-lg p-6"
  >
      <h1 className="text-2xl mb-3 text-white" style={{ fontFamily: "Courgette" }}>
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Cards key={index} imgSrc={card.imgSrc} title={card.title} link={card.link} />
        ))}
      </div>
    </div>
  );
};

export default CardSection;