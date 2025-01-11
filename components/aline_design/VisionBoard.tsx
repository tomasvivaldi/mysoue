"use client";

import Image from "next/image";

interface VisionBoardProps {
  title: string;
  subtitle: string;
  
  imageSrc: string;
  backgroundImageSrc: string;
}

const VisionBoard: React.FC<VisionBoardProps> = ({
  title,
  subtitle,
  
  imageSrc,
  backgroundImageSrc,
}) => {
  return (
    <div className="-mb-32 relative h-[800px] flex flex-col items-center justify-start">
      {/* Background Image */}
      <div className="absolute inset-0  ">
        <Image
          src={backgroundImageSrc}
          alt="Background"
          layout="fill"
          objectFit="cover" // Ensures the image covers the entire area
          objectPosition="center" // Centers the image
        />
      </div>

      {/* Title */}
      <div className="absolute top-8  w-full">
        <div className="flex flex-row justify-center w-full mt-12 gap-4">
            <h1 className="text-4xl font-light text-white">{title}</h1>
            <p className="text-2xl italic text-white mt-2">{subtitle}</p>
        </div>
      </div>

      {/* Container */}
      <div className="relative mt-36 flex max-w-5xl w-full bg-[#FAF4E7] rounded-lg shadow-lg h-[500px]">
        {/* Left Section (Image) */}
        <div className="w-1/2 h-[500px] relative">
          <Image
            src={imageSrc}
            alt="Vision Board"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>

        {/* Right Section (Text) */}
        <div className="w-1/2 p-8 flex flex-col justify-start items-end my-12">
          <span className="text-5xl font-light text-black mb-4">YOUR</span>
          <span className="text-5xl font-light text-black mb-4">ACHIEVABLE</span>
          <p className="text-3xl italic text-black">vision board</p>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;