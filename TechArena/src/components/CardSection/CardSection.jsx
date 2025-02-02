import React, { useState, useEffect, useRef } from "react";

const slides = [
  { image: "https://ir.ozone.ru/s3/multimedia-r/w1200/6678387603.jpg", title: "Samsung S23 Ultra", description: "Android 14" },
  { image: "https://avatars.mds.yandex.net/i?id=4d472f89c72411053297983b99a011b3e39e1248-2375701-images-thumbs&n=13", title: "iPhone 16 Pro", description: "This is a second description" },
  { image: "https://picsum.photos/700/600", title: "This is a third title", description: "This is a third description" },
  { image: "https://picsum.photos/500/400", title: "This is a fourth title", description: "This is a fourth description" },
  { image: "https://picsum.photos/200/300", title: "This is a fifth title", description: "This is a fifth description" },
  { image: "https://picsum.photos/800/700", title: "This is a sixth title", description: "This is a sixth description" },
  { image: "https://picsum.photos/300/400", title: "This is a seventh title", description: "This is a seventh description" },
  { image: "https://picsum.photos/400/200", title: "This is a eigth title", description: "This is a eight description" },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesPerView = 4;
  const totalSlides = slides.length;
  const slideRef = useRef(null);

  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setTimeout(() => {
        setCurrentIndex(0);
        slideRef.current.style.transition = "none";
      }, 300);
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    slideRef.current.style.transition = "transform 0.3s ease-in-out";
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
    slideRef.current.style.transition = "transform 0.3s ease-in-out";
  };

  return (
    <div className="mx-auto p-4 overflow-hidden relative" style={{maxWidth: "1000px"}}>
      <div className="relative overflow-hidden">
        <div
          ref={slideRef}
          className="flex"
          style={{
            transform: `translateX(-${(currentIndex % totalSlides) * (100 / slidesPerView)}%)`,
          }}
        >
          {[...slides, ...slides].map((slide, index) => (
            <div key={index} className="flex-shrink-0 p-4" style={{width: "400px", height: "400px"}}>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img src={slide.image} alt={slide.title} className="w-full h-60 object-cover rounded-lg" />
              <h3 className="text-lg font-bold mt-2">{slide.title}</h3>
              {/* <p className="text-sm text-gray-500">{slide.description}</p> */}
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevSlide} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Prev</button>
        <button onClick={nextSlide} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Next</button>
      </div>
    </div>
  );
}
