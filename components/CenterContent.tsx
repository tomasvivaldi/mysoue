import React from "react";
import GhostButtonBlack from "./GhostButtonBlack";
import { useTranslations } from "next-intl";

const CenterContent: React.FC = () => {
  const t = useTranslations("CenterContent");

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-28 bg-[#fbf9f4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center heading2 text-gray-900 font-simplemichael">
            {t("heading")}
          </h2>
          <p className="pt-2 text-center text-base font-light text-gray-600 mt-4 min-w-xl max-w-2xl mx-auto font-nunito">
            {t("description")}
          </p>
        </div>
        <div className="w-fit mx-auto">
          <GhostButtonBlack text={t("buttonText")} href="/login" />
        </div>
      </div>
    </div>
  );
};

export default CenterContent;
