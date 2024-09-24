import React from "react";
import { CgGym } from "react-icons/cg";

const TrainingPrograms = () => {
  return (
    <div
      id="programs"
      className="w-full flex flex-col text-white font-inter max-w-screen-2xl mx-auto px-40 pb-40 pt-10 "
    >
      <h1 className="text-4xl font-bold uppercase leading-normal">
        The
        <span className="font-outline-4 font-sans font-extrabold">
          {" "}
          Best Programs <br />
        </span>
        We Offer For You
      </h1>

      <div className="w-full flex gap-10 mt-10 font-inter flex-shrink-0 pb-10">
        <div className="w-1/3 flex flex-col gap-2 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 rounded-md shadow-lg shadow-slate-900">
          <CgGym className="w-14 h-14 text-purple-900" />
          <h1 className="font-medium text-[18px]">Strength Training</h1>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
            tempore, rem cum cupiditate amet, ipsam magni ratione nobis natus
            sequi dolorum officia!
          </p>
        </div>
        <div className="w-1/3 flex flex-col gap-2 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 rounded-md shadow-lg shadow-slate-900">
          <CgGym className="w-14 h-14 text-purple-900" />
          <h1 className="font-medium text-[18px]">Strength Training</h1>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
            tempore, rem cum cupiditate amet, ipsam magni ratione nobis natus
            sequi dolorum officia!
          </p>
        </div>
        <div className="w-1/3 flex flex-col gap-2 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 rounded-md shadow-lg shadow-slate-900">
          <CgGym className="w-14 h-14 text-purple-900" />
          <h1 className="font-medium text-[18px]">Strength Training</h1>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
            tempore, rem cum cupiditate amet, ipsam magni ratione nobis natus
            sequi dolorum officia!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingPrograms;
