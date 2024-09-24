import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col text-white font-inter">
      <div className="w-full flex gap-3">
        <div className="w-[60%] flex flex-col gap-5">
          <div className="w-full font-semibold text-5xl px-20 py-32 gap-3 flex flex-col">
            <h1 className="font-light uppercase">
              take your <span className="text-purple-700">fitness</span>
            </h1>
            <h1 className="font-light uppercase">to the next level</h1>
            <p className="w-[60%] font-nunito text-sm font-light mt-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Recusandae delectus omnis, minima mollitia perferendis harum
              accusantium debitis praesentium, non, reprehenderit pariatur
              voluptatibus provident ex optio tempore itaque? Fugiat, modi
              magni.
            </p>
            {/* BUTTON SECTION */}
            <section className="w-full flex gap-1 text-lg ">
              <button className="bg-white px-8 py-2 rounded-md text-purple-700 flex gap-2 justify-center items-center font- font-medium group">
                <span className="group-hover:-translate-x-1 transition-all duration-300 ease-in-out">
                  Get Started
                </span>
                <IoArrowForward className="group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
              </button>
              <button className="px-8 py-2 rounded-md flex gap-2 justify-center items-center font- font-medium group">
                <span className="group-hover:-translate-x-1 transition-all duration-300 ease-in-out">
                  Preview
                </span>
                <IoPlayCircleOutline className="group-hover:translate-x-1 transition-all duration-300 ease-in-out w-6 h-6" />
              </button>
            </section>
          </div>
        </div>
        {/* FOR PICTURE */}
        <div className="w-[40%] bg-red-500">
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
