import Image from "next/image";
import Link from "next/link";
import GhostButton from "./GhostButtonWhite";
import { useTranslations } from "next-intl";

const Banner = () => {
  const t = useTranslations("Banner");
  return (
    <div className="sticky max-w-5xl flex flex-col mx-auto inner-width py-8 mb-8 text-white px-4 md:px-8">
      <div
        className="z-10 relative rounded-xl px-4 md:px-8 py-8 
        flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-4 overflow-hidden"
      >
        <Image
          src="/Banner/banner-bg.svg"
          alt="Banner background"
          fill
          className="object-contain"
          priority
        />
        <div className="w-full flex flex-col lg:flex-row justify-between p-6 lg:p-12 gap-2 lg:gap-0 items-center relative z-10">
          <h2 className="text-2xl md:text-3xl text-shadow max-w-lg font-nunito text-center md:text-left">
            {t("bannerTitle")}
            <br />
            <span className="font-simplemichael text-3xl md:text-4xl">
              {t("bannerHighlight")}
            </span>
          </h2>
          <div className="z-50">
            <GhostButton text={t("bannerButton")} href="/login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
