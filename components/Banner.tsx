import Image from "next/image";
import GhostButton from "./GhostButtonWhite";
import { useTranslations } from "next-intl";

const Banner = () => {
  const t = useTranslations("Banner");
  return (
    <div className="sticky max-w-5xl flex flex-col mx-auto inner-width py-8 mb-8 text-white px-4 md:px-8">
      <div
        className="z-10 relative rounded-xl px-2 md:px-8 py-2 
        flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-4 overflow-hidden"
      >
        <Image
          src="/Banner/banner-bg.svg"
          alt="Banner background"
          fill
          className="object-contain"
          priority
        />
        <div className="w-full md:w-[75%] flex flex-col md:flex-row justify-between p-2 md:p-4 gap-0 sm:gap-2  items-center relative z-10">
          <div className="w-full md:w-[65%] flex flex-col md:justify-between p-2 md:p-4 gap-0 sm:gap-2 items-center md:items-start relative z-10">
            <h2 className=" text-base sm:text-2xl md:text-3xl text-shadow max-w-lg font-nunito  md:text-left line-height-1">
              {t("bannerTitle")}
            </h2>
            <span className="font-simplemichael text-shadow text-sm sm:text-3xl md:text-4xl">
                {t("bannerHighlight")}
              </span>
          </div>
          <div className="z-50 whitespace-nowrap mx-auto">
            <GhostButton text={t("bannerButton")} href="/login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
