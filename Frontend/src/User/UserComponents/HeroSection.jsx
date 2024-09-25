import React from "react";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div
      id="home"
      className="w-full flex flex-col text-white font-nunito max-w-screen-2xl mx-auto"
    >
      <div className="w-full flex gap-3 px-40 pt-40 pb-20 mt-8">
        <div className="w-[70%] flex flex-col gap-5">
          <div className="w-full font-semibold text-5xl gap-3 flex flex-col ">
            <h1 className="font-extrabold uppercase font-inter">
              your body{" "}
              <span className="font-outline-4 font-sans tracking-wide">
                can stand
              </span>
            </h1>

            <h1 className="font-extrabold uppercase font-inter">
              almost anything
            </h1>
            <p className="w-[60%] font-nunito text-[16px] tracking-wide font-light my-4 leading-relaxed">
              Beat the Routine. Train at the Caliber of the World Champion And
              Get In the Best Shape Of Your Life.
            </p>
            {/* BUTTON SECTION */}
            <section className="w-full flex gap-4 text-lg my-1">
              <div className="font-nunito text-white px-8 py-[6px] rounded-full cursor-pointer bg-purple-700 flex gap-2 justify-center items-center font-bold hover:bg-purple-800 duration-300 ease-in-out active:scale-95">
                <span>Get Started</span>
              </div>

              <div className="flex items-center gap-2 px-3 group cursor-pointer">
                <span className="w-9 h-9 bg-[#313236] rounded-full flex items-center justify-center">
                  <FaPlay className="w-3 h-3 ml-[2px] mt-[1px] group-hover:w-4 group-hover:h-4 transition-all duration-300 ease-in-out group-active:scale-90" />
                </span>
                <span className="font-inter font-light">Watch Video</span>
              </div>
            </section>

            {/* For Summary Info */}
            <section className="w-full flex font-inter text-lg px-1 mt-8 space-x-5">
              {/* Members Section */}
              <div className="flex flex-col leading-tight">
                <span>500+ </span>
                <div className="relative w-full h-[2px] bg-[#636363] my-1 rounded-lg">
                  <div className="absolute top-0 bg-purple-600 w-1/3 h-[2px] rounded-lg"></div>
                </div>
                <span className="font-light pr-10">Members</span>
              </div>

              {/* Divider */}
              <div className="w-[1px] h-[55px] bg-[#636363]"></div>

              {/* Fitness Programs Section */}
              <div className="flex flex-col leading-tight">
                <span>20+ </span>
                <div className="relative w-full h-[2px] bg-[#636363] my-1 rounded-lg">
                  <div className="absolute top-0 bg-purple-600 w-1/3 h-[2px] rounded-lg"></div>
                </div>
                <span className="font-light">Fitness Programs</span>
              </div>

              {/* Divider */}
              <div className="w-[2px] h-[55px] bg-[#636363]"></div>

              {/* Years of Service Section */}
              <div className="flex flex-col leading-tight">
                <span>10+ </span>
                <div className="relative w-full h-[2px] bg-[#636363] my-1 rounded-lg">
                  <div className="absolute top-0 bg-purple-600 w-1/3 h-[2px] rounded-lg"></div>
                </div>
                <span className="font-light">Years of Service</span>
              </div>
            </section>
          </div>
        </div>
        {/* FOR PICTURE */}
        <div className="w-[40%]">
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
