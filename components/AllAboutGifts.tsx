import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SmallTextBanner } from "./banners/SmallTextBanner";
import GiftStack from "./GiftStack";
import SolidButton from "./buttons/SolidButton";

const AllAboutGifts = () => {
  const t = useTranslations("AllAboutGifts");

  return (
    <div key="1" className="bg-[#fff8e9]">
      {/* <SmallTextBanner
        items={[
          t("bannerText"),
          t("bannerText"),
          t("bannerText"),
          t("bannerText"),
          t("bannerText"),
        ]}
        extraWord={t("extraWord")}
        genericText={t("genericText")}
        textColor="#b91c1c"
        bgColor=""
        direction="left"
        speed="slow"
        className="border border-b-[#B72228] border-t-[#B72228] mt-36 my-12 py-4 text-4xl tracking-[0.2em]   "
      /> */}
      <div className=" my-8  w-full pb-12 flex justify-center">
        <SolidButton text="Register Now" href="/login" className="text-xl px-12 py-4" />
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-around sm:p-8 x-paddings">
        <Image
          alt={t("imageAlt")}
          className="mb-10 lg:mb-4 rounded-lg object-cover mx-auto w-[95%] sm:w-[80%] lg:w-[45%] h-[600px]"
          height="300"
          src="/gift1.webp"
          style={{
            aspectRatio: "520/300",
            objectFit: "cover",
          }}
          width="520"
        />
        <div className="flex flex-col gap-8 w-full md:w-[50%] mx-auto">
          <div className="flex flex-col gap-6 justify-center text-center text-lg">
            <h1 className="font-simplemichael text-4xl font-thin">
              {t("headline")}
            </h1>
            <p className="font-nunito text-gray-700 ">{t("description1")}</p>
            <p className="font-nunito text-gray-700">{t("description2")}</p>
            <p className="font-nunito text-gray-700">{t("description3")}</p>
          </div>
          <GiftStack />
        </div>
      </div>
      <SmallTextBanner
        items={[
          t("secondBanner"),
          t("secondBanner"),
          t("secondBanner"),
          t("secondBanner"),
          t("secondBanner"),
          t("secondBanner"),
          t("secondBanner"),
          t("secondBanner"),
        ]}
        extraWord={t("secondExtraWord")}
        genericText={t("secondGenericText")}
        textColor="#FFFFFF"
        bgColor=""
        direction="left"
        speed="slow"
        className="bg-[#B72228] mt-4 translate-y-[50%] text-xs tracking-[0.2em] font-light"
      />
    </div>
  );
};

export default AllAboutGifts;
