import React from "react";
import { Button2 } from "./buttons/Button2";
import GhostButtonBlack from "./GhostButtonBlack";
import SolidButtonBlack from "./SolidButtonBlack";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/router";

const ConfirmationStep: React.FC = () => {
  const t = useTranslations("ConfirmationStep");
  //   const router = useRouter();

  //   const handleCheckWishlists = () => {
  //     router.push("/dashboard/my-wishlists");
  //   };

  //   const handleBackToLists = () => {
  //     router.push("/dashboard/our-lists");
  //   };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full w-full">
      <div className="rounded-md border-gray-200 bg-[#fbf9f4] px-4 md:px-12 py-8 w-[90%] sm:w-[80%]  mx-auto shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">{t("title")}</h2>
        <p className="text-gray-600 mb-8">
          {t("description")}
        </p>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
          <a href="/dashboard/mysoue-lists">
            <GhostButtonBlack text={t("checkWishlists")} />
          </a>
          <a href="/dashboard/my-wishlists">
            <SolidButtonBlack text={t("backToLists")} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
