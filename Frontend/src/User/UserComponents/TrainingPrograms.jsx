import React, { useRef, useState } from "react";
import { CgGym } from "react-icons/cg";
import { TbTreadmill } from "react-icons/tb";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GiBoxingGloveSurprise } from "react-icons/gi";
import { TbYoga } from "react-icons/tb";

const programs = [
  {
    name: "Strength Training",
    icon: CgGym,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi tempore, rem cum cupiditate amet, ipsam magni ratione nobis natussequi dolorum officia",
  },
  {
    name: "Cardio",
    icon: TbTreadmill,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi tempore, rem cum cupiditate amet, ipsam magni ratione nobis natussequi dolorum officia",
  },
  {
    name: "Zumba and Aerobics",
    icon: MdOutlineDirectionsRun,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi tempore, rem cum cupiditate amet, ipsam magni ratione nobis natussequi dolorum officia",
  },
  {
    name: "Boxing",
    icon: GiBoxingGloveSurprise,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi tempore, rem cum cupiditate amet, ipsam magni ratione nobis natussequi dolorum officia",
  },
  {
    name: "Yoga Classes",
    icon: TbYoga,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi tempore, rem cum cupiditate amet, ipsam magni ratione nobis natussequi dolorum officia",
  },
  {
    name: "Nutrition Support",
    icon: GiFruitBowl,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi tempore, rem cum cupiditate amet, ipsam magni ratione nobis natussequi dolorum officia",
  },
];

const TrainingPrograms = () => {
  const [startIndex, setStartIndex] = useState(0);
  const nextCard = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, programs.length - 3));
  };

  const prevCard = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div
      id="programs"
      className="w-full flex flex-col text-white font-inter max-w-screen-2xl mx-auto px-40 pb-40 pt-10 "
    >
      <div className="w-full flex justify-between mt-20">
        <h1 className="text-4xl font-bold uppercase leading-normal">
          The
          <span className="font-outline-4 font-sans font-extrabold">
            {" "}
            Best Programs <br />
          </span>
          We Offer For You
        </h1>

        <div className="flex gap-4 px-4">
          <IoIosArrowRoundBack
            onClick={prevCard}
            className={`w-10 h-10 ${
              startIndex === 0 ? "text-gray-500" : "text-purple-600"
            }`}
          />
          <IoIosArrowRoundForward
            onClick={nextCard}
            className={`w-10 h-10 cursor-pointer ${
              startIndex === programs.length - 3
                ? "text-gray-500"
                : "text-purple-600"
            }`}
          />
        </div>
      </div>

      <div className="w-full gap-12 px-2 flex mt-10 font-inter py-10 overflow-x-hidden items-center">
        {programs.map((program) => (
          <div
            key={program.name}
            className="w-[30%] flex flex-shrink-0 flex-col gap-2 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 rounded-md shadow-lg shadow-slate-900 transition-transform duration-300 ease-in-out "
            style={{ transform: `translateX(-${startIndex * 110}%)` }}
          >
            <program.icon className="w-10 h-10 " />
            <h1 className="font-normal">{program.name}</h1>
            <p className="font-thin">{program.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPrograms;
