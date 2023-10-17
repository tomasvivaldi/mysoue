import React from "react";
import Image from "next/image";
import ImageSlider from "./ImageSlider";

const HeroSection = () => {
  return (
    <div className="relative h-screen ">
      {/* Image Slider */}
      <ImageSlider />

      {/* Gray Overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-50" />

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-white mb-4 heading1">Jiyukan Karlsruhe</h1>
          <p className="text-slate-200 mb-6 paragraph-regular">
            " Eine Reise durch Aikido ist eine Fahrt in die gelassene
            Meisterschaft des eigenen Geistes. "
          </p>
          {/* <div className="space-x-4">
            <button className="bg-white text-gray-800 px-6 py-2 rounded-md hover:bg-opacity-90 transition">
              Button 1
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-800 transition">
              Button 2
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
