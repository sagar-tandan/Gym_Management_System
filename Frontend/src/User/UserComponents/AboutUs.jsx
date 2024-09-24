import React from "react";

const AboutUs = () => {
  return (
    <div id="about" className="w-full flex flex-col text-white font-inter max-w-screen-2xl mx-auto px-40 pb-40 pt-40 ">
      <div className="w-full flex justify-between">
        <img
          className="w-[500px] h-[380px] rounded-md object-cover"
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
          <p className="font-inter font-light">
            At our gym, we are dedicated to helping individuals achieve their
            fitness goals. We offer a wide range of programs and services
            tailored to meet your needs, whether you're a seasoned athlete or
            just beginning your fitness journey.
          </p>
          <p className="font-inter font-light">
            We believe that everyone deserves access to the transformative
            benefits of exercise, and we're here to help make that a reality.
          </p>
          <div className="w-full flex">
          <button className="bg-purple-700 rounded-md px-6 py-[6px] mt-3 font-inter active:scale-95 transition-all duration-150 ease-in-out">Join Today</button>


          </div>


        </div>
      </div>
    </div>
  );
};

export default AboutUs;
