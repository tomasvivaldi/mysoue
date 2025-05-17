import AllAboutGifts from "@/components/AllAboutGifts";
import Banner from "@/components/Banner";
import FolderNotch from "@/components/FolderNotch";
import Hero2 from "@/components/Hero2";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import OurLists from "@/components/OurLists";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Carrousel from "@/components/aline_design/Carrousel";
import MidBanner from "@/components/aline_design/MidBanner";
import VideoBanner from "@/components/aline_design/VideoBanner";
import VisionBoard from "@/components/aline_design/VisionBoard";
import Wishes from "@/components/aline_design/Wishes";
import WishlistsFeatures from "@/components/aline_design/WishlistsFeatures";

import { RedLogosBanner } from "@/components/banners/RedLogosBanner";
import { SmallTextBanner } from "@/components/banners/SmallTextBanner";
import SolidButton from "@/components/buttons/SolidButton";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

const HomePage = () => {
  const locale = getLocale();
  const t = useTranslations("SmallTextBanner");
  const testimonials = [
    {
      text: "Orci Vel Eget In Eu. Integer Amet Porttitor Hendrerit Etiam Arcu, Aliquet Duis Pretium Consequat. Semper Sed Viverra Enim Ut Nunc.",
      author: "Courtney Henry",
      avatarUrl: "/avatars/courtney-henry.png",
      rating: 5,
    },
    {
      text: "Tincidunt Risus, Blandit Proin Semper. Tellus Ac Pellentesque Convallis Vitae. Lorem Enim Cursus Et Consequat Viverra Id Justo Ullamcorper. Vel.",
      author: "Darrell Steward",
      avatarUrl: "/avatars/darrell-steward.png",
      rating: 4,
    },
    {
      text: "Fusce Egestas Tellus Rutrum Tellus Pellentesque Eu Tincidunt Tortor Aliquam. Nulla Pellentesque Dignissim Enim Sit Amet Venenatis.",
      author: "Theresa Webb",
      avatarUrl: "/avatars/theresa-webb.png",
      rating: 5,
    },
    {
      text: "Maecenas Sed Enim Ut Sem Viverra Aliquet. Nec Sagittis Aliquam Malesuada Bibendum Arcu Vitae Elementum Curabitur.",
      author: "Cody Fisher",
      avatarUrl: "/avatars/cody-fisher.png",
      rating: 4,
    },
    {
      text: "Sed Risus Pretium Quam Vulputate Dignissim Suspendisse In Est Ante In Nibh Mauris Cursus Mattis.",
      author: "Esther Howard",
      avatarUrl: "/avatars/esther-howard.png",
      rating: 5,
    },
  ];

  return (
    <>
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
