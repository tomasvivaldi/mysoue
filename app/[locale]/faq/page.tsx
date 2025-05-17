import FAQSection from "@/components/FAQ";
import Banner from "@/components/Banner";
import { RedLogosBanner } from "@/components/banners/RedLogosBanner";
import { SmallTextBanner } from "@/components/banners/SmallTextBanner";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import SolidButton from "@/components/buttons/SolidButton";
import { FloatingButton } from "@/components/ui/FloatingButton";
import HeroBanner2 from "@/components/aline_design/HeroBanner2";
import MidBanner from "@/components/aline_design/MidBanner";

const FAQPage = () => {
  const locale = getLocale();
  const t = useTranslations("SmallTextBanner");

  return (
    <>
      <SolidButton text="Start Now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <FloatingButton/>
      <HeroBanner2 />
      <FAQSection />
      {/* <SmallTextBanner
        items={[t("faq"), t("faq")]}
        extraWord={t("questions")}
        genericText={t("frequentlyAsked")}
        textColor="#b91c1c"
        bgColor=""
        direction="left"
        speed="normal"
        className="border border-b-[#C64138] border-t-[#C64138] my-4 py-4 text-4xl tracking-[0.2em]"
      /> */}
      <MidBanner />
      <RedLogosBanner speed="fast" />
      <div className="w-full mb-[100px]" />
    </>
  );
};

export default FAQPage; 