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
    <div className="-mb-16 relative h-[600px] md:h-[800px] flex flex-col items-center justify-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImageSrc}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* Title */}
      <div className="absolute top-4 w-full">
        <div className="flex flex-col md:flex-row justify-center items-center w-full mt-8 sm:mt-16 gap-2">
          <h1 className="text-2xl md:text-4xl font-light text-white">{title}</h1>
          <p className="text-lg md:text-2xl italic text-white z-10 text-shadow">{subtitle}</p>
        </div>
      </div>

      {/* Container */}
      <div className="relative mt-20 md:mt-36 flex flex-col md:flex-row max-w-5xl w-full bg-[#FAF4E7] rounded-lg shadow-lg h-auto md:h-[500px]">
        {/* Left Section (Image) */}
        <div className="w-full h-[250px] md:w-1/2 md:h-full relative">
          <Image
            src={imageSrc}
            alt="Vision Board"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
        </div>

        {/* Right Section (Text) */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center items-center md:items-end my-4 md:my-12">
          <span className="text-3xl md:text-5xl font-light text-black mb-2">YOUR</span>
          <span className="text-3xl md:text-5xl font-light text-black mb-2">ACHIEVABLE</span>
          <p className="text-xl md:text-3xl italic text-black text-center md:text-right">
            vision board
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;