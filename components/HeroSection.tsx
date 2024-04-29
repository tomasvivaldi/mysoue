import React from "react";
import Image from "next/image";
import HeroCard from "./HeroCard";
import GhostButtonBlack from "./GhostButtonBlack";

const HeroSection = () => {
  return (
    <div key="1" className=" p-8 x-paddings2">
      <div className="flex flex-col lg:flex-row lg:space-x-8  ">
        <div className="w-full">
          <h1 className="font-semibold heading2 text-center mb-2 -mt-6">
            We are all about gift
          </h1>
          <Image
            alt="Gift with ribbon"
            className="mb-4 rounded-lg object-cover w-full h-64"
            height="300"
            src="/bg1.jpg"
            style={{
              aspectRatio: "520/300",
              objectFit: "cover",
            }}
            width="520"
          />
          <div className="flex md:flex-row flex-col gap-8 mt-8">
            <div className=" w-full md:w-[40%] flex flex-col  justify-center">
              <p className="text-gray-700 text-lg mb-4">
                At mysoue, we reimagine the gift-giving experience, turning
                special occasions into unforgettable moments. Going beyond
                conventional wish lists, we serve as a hub that synchronizes
                your wishlist dreams by transforming the thoughtfulness of your
                lovers into carefully curated gifts.
              </p>
              <div className="mx-auto ">
                <GhostButtonBlack text="Create Your List" />
              </div>
            </div>
            <div className="w-full md:w-[60%] gap-4 flex flex-row justify-between overflow-x-scroll sm:overflow-x-auto">
              <HeroCard
                title="Christmas"
                imagePath="/xmas.jpg" // Replace with the actual path to your image
              />
              <HeroCard
                title="Christmas"
                imagePath="/xmas.jpg" // Replace with the actual path to your image
              />
              <HeroCard
                title="Christmas"
                imagePath="/xmas.jpg" // Replace with the actual path to your image
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
