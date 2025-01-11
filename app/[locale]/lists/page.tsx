"use client";
import React from "react";
import { motion } from "framer-motion";
import TopBanner from "@/components/TopBanner";
import Head from "next/head";
import Image from "next/image";
import TeamSection from "@/components/TeamSection";
import Banner2 from "@/components/Banner2";
import TopBanner2 from "@/components/TopBanner2";
import { useTranslations } from "next-intl";
import OurAbout from "@/components/aline_design/OurAbout";
import Founders from "@/components/aline_design/Founders";
import BottomBanner from "@/components/aline_design/BottomBanner";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";
import SolidButton from "@/components/buttons/SolidButton";
import { FocusCards } from "@/components/aline_design/FocusCards";

const cards = [
  {
    title: "GRADUATION",
    src: "/Lists/card1.jpg",
  },
  {
    title: "CHRISTMAS",
    src: "/Lists/card2.jpg",
  },
  {
    title: "BIRTHDAY",
    src: "/Lists/card3.jpg",
  },
  {
    title: "BABY SHOWER",
    src: "/Lists/card3.jpg",
  },
];

const Lists = () => {
  const t = useTranslations("ourStory");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <SolidButton text="start now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <HeroBanner3 
        backgroundImage={"/Lists/bg.jpg"} 
        headingText="FOR ALL" 
        italicText="wishes"
        />
      <div className="  flex flex-col p-4 x-paddings items-center mb-20">
        <div className="z-20 my-14 flex flex-col md:flex-row gap-[15px] sm:gap-6 flex-nowrap">
            <a href="#">
              <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              GRADUATION</button>
            </a>
            <a href="#">
              <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              CHRISTMAS</button>
            </a>
            <a href="#">
              <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              BIRTHDAY</button>
            </a>
            <a href="#">
              <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              BABY SHOWER
              </button>
            </a>
          </div>
        <FocusCards cards={cards} />
      </div>
    </>
  );
};

export default Lists;
