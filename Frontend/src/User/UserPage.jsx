import React from "react";
import HeroSection from "./UserComponents/HeroSection";
import MarqueeComp from "./UserComponents/MarqueeComp";
import AboutUs from "./UserComponents/AboutUs";
import TrainingPrograms from "./UserComponents/TrainingPrograms";

const UserPage = () => {
  return (
    <div className="w-full overflow-x-hidden relative">
      <div className="fixed top-0 -z-10 h-full w-full max-w-screen-2xl">
        <div class="relative h-full w-full bg-slate-950">
          <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
        </div>

        {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
      </div>
      <div className="w-full flex flex-col max-w-screen-2xl mx-auto">
        <HeroSection />
        <AboutUs />
        <TrainingPrograms />
        {/* <Slider /> */}
      </div>
    </div>
  );
};

export default UserPage;
