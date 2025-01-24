import AllAboutGifts from "@/components/AllAboutGifts";
import Banner from "@/components/Banner";
import FAQSection from "@/components/FAQ";
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

import { RedLogosBanner } from "@/components/banners/RedLogosBanner";
import { SmallTextBanner } from "@/components/banners/SmallTextBanner";
import SolidButton from "@/components/buttons/SolidButton";

const HomePage = () => {
  const testimonials = [
    {
      text: "Orci Vel Eget In Eu. Integer Amet Porttitor Hendrerit Etiam Arcu, Aliquet Duis Pretium Consequat. Semper Sed Viverra Enim Ut Nunc.",
      author: "Courtney Henry",
      avatarUrl: "/avatars/courtney-henry.png", // Replace with path to your image assets
      rating: 5,
    },
    {
      text: "Tincidunt Risus, Blandit Proin Semper. Tellus Ac Pellentesque Convallis Vitae. Lorem Enim Cursus Et Consequat Viverra Id Justo Ullamcorper. Vel.",
      author: "Darrell Steward",
      avatarUrl: "/avatars/darrell-steward.png", // Replace with path to your image assets
      rating: 4,
    },
    {
      text: "Fusce Egestas Tellus Rutrum Tellus Pellentesque Eu Tincidunt Tortor Aliquam. Nulla Pellentesque Dignissim Enim Sit Amet Venenatis.",
      author: "Theresa Webb",
      avatarUrl: "/avatars/theresa-webb.png", // Replace with path to your image assets
      rating: 5,
    },
    {
      text: "Maecenas Sed Enim Ut Sem Viverra Aliquet. Nec Sagittis Aliquam Malesuada Bibendum Arcu Vitae Elementum Curabitur.",
      author: "Cody Fisher",
      avatarUrl: "/avatars/cody-fisher.png", // Replace with path to your image assets
      rating: 4,
    },
    {
      text: "Sed Risus Pretium Quam Vulputate Dignissim Suspendisse In Est Ante In Nibh Mauris Cursus Mattis.",
      author: "Esther Howard",
      avatarUrl: "/avatars/esther-howard.png", // Replace with path to your image assets
      rating: 5,
    },
  ];

  return (
    <>
      <SolidButton text="start now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <VideoBanner />
      <Wishes />
      <SmallTextBanner
        items={[
          "the gifting world",
          "the gifting world",
       
        ]} // Array length for repetition
        extraWord="Creativity"
        genericText="WELCOME TO"
        textColor="#b91c1c"
        bgColor=""
        direction="left"
        speed="normal"
        className="border border-b-[#C64138] border-t-[#C64138] my-4 py-4 text-4xl tracking-[0.2em] font-inter"
      />
      <MidBanner />
      <Carrousel />
      {/* <Hero2 /> */}
      {/* <FolderNotch>
        <AllAboutGifts />
      </FolderNotch> */}

      {/* <SmallTextBanner
        items={[
          "Occasions",
          "Lifestyles",
          "Wishes",
          "Ages",
          "Occasions",
          "Lifestyles",
          "Wishes",
          "Ages",
        ]} // Array length for repetition
        extraWord="Creativity"
        genericText="FOR ALL"
        textColor="#FFFFFF"
        bgColor=""
        direction="left"
        speed="normal"
        className="bg-[#C64138] my-4 text-xs tracking-[0.2em] font-light"
      />
      
      <SmallTextBanner
        items={[
          "WE GOT IT",
          "WE GOT IT",
          "WE GOT IT",
          "WE GOT IT",
          "WE GOT IT",
        ]} // Array length for repetition
        extraWord="Creativity"
        genericText="you want it"
        textColor="#b91c1c"
        bgColor=""
        direction="left"
        speed="normal"
        className="border border-b-[#C64138] border-t-[#C64138] my-4 py-4 text-4xl tracking-[0.2em] font-inter"
      />
      <SmallTextBanner
        items={[
          "Gifting world",
          "Gifting world",
          "Gifting world",
          "Gifting world",
          "Gifting world",
        ]} // Array length for repetition
        extraWord="Creativity"
        genericText="welcome to the"
        textColor="#000"
        bgColor=""
        direction="left"
        speed="normal"
        className="border border-b-black border-t-black my-4 py-4 text-4xl tracking-[0.2em] font-inter"
      /> 
      
      

      {/* Responsive ; Need Final Copy */}
      {/* <Banner /> */}
     
      {/* Responsive ; Need Final Copy */}
      {/* <HowItWorks /> */}
      {/* <OurLists /> */}
      {/* <TestimonialCarousel /> */}
      <Banner />
      {/* <FAQSection /> */}
      {/* <RedLogosBanner speed="fast" /> */}
      <VisionBoard
        title="I WANT"
        subtitle="pilates mom vibes"
        imageSrc="/Index/footer-banner-image.jpg" // Replace with the image path
        backgroundImageSrc="/Index/footer-banner-bg.png" // Replace with the background path
      />
      <div className="w-full mb-[100px]" />
    </>
  );
};

export default HomePage;
