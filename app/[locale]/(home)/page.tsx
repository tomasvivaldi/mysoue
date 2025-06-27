import Banner from "@/components/Banner";
import Carrousel from "@/components/aline_design/Carrousel";
import MidBanner from "@/components/aline_design/MidBanner";
import { PromotionBanner } from "@/components/aline_design/PromotionBanner";
import VideoBanner from "@/components/aline_design/VideoBanner";
import VisionBoard from "@/components/aline_design/VisionBoard";
import Wishes from "@/components/aline_design/Wishes";
import { SmallTextBanner } from "@/components/banners/SmallTextBanner";
import SolidButton from "@/components/buttons/SolidButton";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

const HomePage = () => {
  const locale = getLocale();
  const t = useTranslations("SmallTextBanner");
  return (
    <>      
      <PromotionBanner className="bg-primary">
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
          New wishlists available for Valentine's Day.{" "}
          <a href="/explore" className="transition duration-200 hover:underline">
            Check out our new lists
          </a>
        </p>
      </PromotionBanner>
      <SolidButton text="Start Now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <FloatingButton/>
      <VideoBanner locale={locale} />
      <Wishes />
      <SmallTextBanner
        items={[t("theGiftingWorld"), t("theGiftingWorld")]}
        extraWord={t("creativity")}
        genericText={t("welcomeTo")}
        textColor="#b91c1c"
        bgColor=""
        direction="left"
        speed="normal"
        className="border border-b-[#C64138] border-t-[#C64138] my-4 py-4 text-4xl tracking-[0.2em]   "
      />
      <MidBanner />
      <Carrousel />
      <Banner />
      <VisionBoard
        imageSrc="/Index/footer-banner-image.jpg"
        backgroundImageSrc="/Index/footer-banner-bg.png"
      />
      <div className="w-full mb-[100px]" />
    </>
  );
};

export default HomePage;
