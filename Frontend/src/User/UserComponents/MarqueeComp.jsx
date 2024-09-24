import React from "react";
import Marquee from "react-fast-marquee";
import mb from "../../assets/Marquee/mb.png";
import ak from "../../assets/Marquee/ak.png";
import usn from "../../assets/Marquee/usn.png";
import gyms from "../../assets/Marquee/gyms.png";
import biotech from "../../assets/Marquee/biotech.png";

const MarqueeComp = () => {
  return (
    <div className="w-full flex flex-col text-white font-nunito max-w-screen-2xl mx-auto">
      <Marquee>
        <img
          className="w-[200px] mx-12 h-[50px] object-cover"
          src={mb}
          alt="muscleblaze"
        />

        <img
          className="w-[200px] mx-12 h-[50px] object-cover"
          src={usn}
          alt="usn"
        />
        <img
          className="w-[200px] mx-12 h-[50px] object-cover"
          src={gyms}
          alt="gymshark"
        />
        <img
          className="w-[200px] mx-12 h-[50px] object-cover"
          src={biotech}
          alt="biotech"
        />
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
