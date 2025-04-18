"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function BottomBanner() {
  // 1) Create a translator for the "BottomBanner" namespace
  const t = useTranslations("BottomBanner");

  return (
    <div className="relative w-full bg-[#FAF7F3] -mb-10 ">
      {/* Background Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/About/banner.jpg"
          alt="Choosing a gift background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-center z-10 px-6 mx-24">
        <div className="text-shadow">
          {/* 2) Translate the heading and subheading */}
          <h2 className="text-white text-2xl md:text-4xl font-semibold leading-tight tracking-wide">
            {t("choosingAGift")}
          </h2>
          <p className="text-white text-lg md:text-2xl italic mt-2">
            {t("doesntHaveToBeHard")}
          </p>
        </div>
        {/* 3) Translate the button text */}
        <a href="/login" className="whitespace-nowrap mt-4 px-6 py-2 bg-[#FFF9E8] text-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all">
          {t("startNow")}
        </a>
      </div>
    </div>
  );
}