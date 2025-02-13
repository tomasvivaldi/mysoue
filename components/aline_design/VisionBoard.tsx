"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface VisionBoardProps {
  imageSrc: string;
  backgroundImageSrc: string;
}

export default function VisionBoard({
  imageSrc,
  backgroundImageSrc,
}: VisionBoardProps) {
  // 1) Create a translator for the "VisionBoard" namespace
  const t = useTranslations("VisionBoard");

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

      {/* Hard-coded Title & Subtitle, now using translations */}
      <div className="absolute top-4 w-full">
        <div className="flex flex-col md:flex-row justify-center items-center w-full mt-8 sm:mt-16 gap-2">
          {/* "I WANT" -> t("iWant") */}
          <h1 className="text-2xl md:text-4xl font-light text-white">
            {t("iWant")}
          </h1>
          {/* "pilates mom vibes" -> t("pilatesMomVibes") */}
          <p className="text-lg md:text-2xl italic text-white z-10 text-shadow">
            {t("pilatesMomVibes")}
          </p>
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
          {/* If you also want to translate these, 
              use t("your"), t("achievable"), etc. */}
          <span className="text-3xl md:text-5xl font-light text-black mb-2">
            {t("your")}
          </span>
          <span className="text-3xl md:text-5xl font-light text-black mb-2">
            {t("achievable")}
          </span>
          <p className="text-xl md:text-3xl italic text-black text-center md:text-right">
            {t("visionBoard")}
          </p>
        </div>
      </div>
    </div>
  );
}