import { useState } from "react";

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

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesPerPage = 3;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - slidesPerPage : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= slides.length - slidesPerPage ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerPage)}%)`, width: `${slides.length * (100 / slidesPerPage)}%` }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 p-4" style={{width: "15%"}}>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img src={slide.image} alt={slide.title} className="w-full h-60 object-cover rounded-lg" />
              <h3 className="text-lg font-bold mt-2">{slide.title}</h3>
              {/* <p className="text-sm text-gray-500">{slide.description}</p> */}
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
      <i class="fa-solid fa-chevron-right"></i> 
      </button>
    </div>
  );
}
