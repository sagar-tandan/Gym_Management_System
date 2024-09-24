import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col text-white font-nunito">
      <div className="w-full flex gap-3 px-40 py-32">
        <div className="w-[60%] flex flex-col gap-5">
          <div className="w-full font-semibold text-5xl  gap-3 flex flex-col ">
            <h1 className="font-extrabold uppercase font-inter">
              your body{" "}
              <span className="font-outline-4 font-sans tracking-wide">
                can stand
              </span>
            </h1>

            <h1 className="font-extrabold uppercase font-inter">
              almost anything
            </h1>
            <p className="w-[70%] font-nunito text-[16px] tracking-wide font-light my-4 leading-relaxed">
              Beat the Routine. Train at the Caliber of the World Champion And
              Get In the Best Shape Of Your Life.
            </p>
            {/* BUTTON SECTION */}
            <section className="w-full flex gap-1 text-lg ">
              <div className="font-nunito text-white px-8 py-[6px] rounded-full cursor-pointer bg-[#600864] flex gap-2 justify-center items-center font-bold ">
                <span>Get Started</span>
              </div>

              <div className="flex items-center gap-2 px-3">
                <span className="w-9 h-9 bg-[#313236] rounded-full flex items-center justify-center">
                  <FaPlay className="w-3 h-3 ml-[2px] mt-[1px]" />
                </span>
                <span className="font-inter font-light">Watch Video</span>
              </div>
            </section>

            {/* For Summary Info */}
            <section className="w-full flex font-inter text-lg px-1 mt-3 ">
              <div className="flex flex-col leading-tight">
                <span>500+ </span>
                <div className="relative w-full h-[2px] bg-[#636363] my-1">
                  <span className=" absolute top-0"></span>
                </div>
                <span className="font-light">Members </span>
              </div>
              <span className="w-[1px] h-[40px] bg-[#636363] mx-5"></span>
              <div className="flex flex-col leading-tight">
                <span>20+ </span>
                <span className="font-light">Fitness Programs </span>
              </div>
              <span className="w-[1px] h-[40px] bg-[#636363] mx-5"></span>

              <div className="flex flex-col leading-tight">
                <span>10+ </span>
                <span className="font-light">Years of Service</span>
              </div>
            </section>
          </div>
        </div>
        {/* FOR PICTURE */}
        <div className="w-[40%] bg-red-500"></div>
      </div>
    </div>
  );
};

export default HeroSection;
