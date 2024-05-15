import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // Import the useTranslations hook

const Hero2 = () => {
  const t = useTranslations("Hero");

  return (
    <div className="relative w-full h-screen -mt-[100px]">
      <Image
        alt={t("heroImageAlt")}
        className="w-full h-full object-cover"
        width={2000}
        height={1000}
        src="/hero.png"
      />
      <div className="absolute bottom-0 right-0 p-16 text-white text-right">
        <h1 className="text-7xl font-nunito font-medium">{t("gifting")}</h1>
        <p className="text-6xl font-simplemichael font-extralight">
          {t("madeAuthentic")}
        </p>
        <Image
          alt={t("logoAlt")}
          className="w-[350px] py-8 ml-auto"
          width={4422}
          height={1401}
          src="/Stamp/Logo-Mysoue-Stamp_4.png"
        />
      </div>
    </div>
  );
};

export default Hero2;
