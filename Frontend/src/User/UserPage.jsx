import React from "react";
import HeroSection from "./UserComponents/HeroSection";

const UserPage = () => {
  return (
    <div class="w-full max-w-screen-2xl mx-auto flex flex-col gap-4 h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <HeroSection />
    </div>
  );
};

export default UserPage;
