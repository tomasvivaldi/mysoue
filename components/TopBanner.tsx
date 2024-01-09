import React from "react";
import Image from "next/image";

interface TopBannerProps {
  title: string; // Specify that title is a string
}

const TopBanner: React.FC<TopBannerProps> = ({ title }) => {
  // Accepting title as a prop
  return (
    <div className="relative top-0 h-[60vh] sm:h-[30vh] mb-[30vh] pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 h-[60vh] sm:h-[55vh]">
        <Image
          src="/bg1.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Top Banner Background"
          priority
        />
        {/* Gray Overlay */}
        <div className="absolute inset-0 h-[60vh] sm:h-[55vh] bg-black opacity-50 " />
      </div>

      {/* Overlay Content */}
      <div className="absolute x-paddings w-full flex items-center justify-start z-20 h-40">
        <div className="text-left flex flex-col gap-4 x-paddings mt-24">
          <h1 className="text-white heading1 my-auto text-shadow">
            {title} {/* Using the title prop */}
            <br />
          </h1>
          <p className="text-white text-base max-w-md text-shadow">
            We are a dedicated team with a mission to make wishlists accessible
            to everyone.
          </p>

          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
