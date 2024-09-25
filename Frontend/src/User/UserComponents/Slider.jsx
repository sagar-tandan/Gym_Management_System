import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Example usage
const cards = [
  { title: "Card 1", content: "This is the content of card 1" },
  { title: "Card 2", content: "This is the content of card 2" },
  { title: "Card 3", content: "This is the content of card 3" },
  { title: "Card 4", content: "This is the content of card 4" },
  { title: "Card 5", content: "This is the content of card 5" },
];

export const CardSlider = ({ cards }) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextCard = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 3));
  };

  const prevCard = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${startIndex * 33.33}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className="w-1/3 flex-shrink-0 px-2">
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                <p className="text-gray-600">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevCard}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        disabled={startIndex === 0}
      >
        <ChevronLeft
          className={`w-6 h-6 ${
            startIndex === 0 ? "text-gray-300" : "text-gray-600"
          }`}
        />
      </button>
      <button
        onClick={nextCard}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        disabled={startIndex === cards.length - 3}
      >
        <ChevronRight
          className={`w-6 h-6 ${
            startIndex === cards.length - 3 ? "text-gray-300" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
};
