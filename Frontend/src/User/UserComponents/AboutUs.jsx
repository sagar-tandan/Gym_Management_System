import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full flex flex-col text-white font-inter max-w-screen-2xl mx-auto  px-40 pb-40 pt-10 ">
      <div className="w-full flex justify-between">
        <img
          className="w-[450px] h-[350px] rounded-md object-cover"
          src="https://www.focusfitness.net/wp-content/uploads/2019/08/Best-Jump-Ropes-for-Cardio.jpg"
          alt=""
        />
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-4xl font-bold uppercase leading-normal">
            Get Ready to Reach Your
            <span className="font-outline-4 font-sans font-extrabold">
              {" "}
              Fitness Goals
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
