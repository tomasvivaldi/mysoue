"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useTranslations } from "next-intl";

import HeroBanner3 from "@/components/aline_design/HeroBanner3";
import SolidButton from "@/components/buttons/SolidButton";
import { FocusCards } from "@/components/aline_design/FocusCards";
import { FloatingButton } from "@/components/ui/FloatingButton";

// Example data for FocusCards
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
  // 1) Create a translator from the "ListsPage" namespace
  const t = useTranslations("ListsPage");

  // Animation settings
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {/* 2) Replace the hard-coded page title */}
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>

      {/* 3) Translate "start now" */}
      <SolidButton text="Start Now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <FloatingButton/>

      {/* 4) Translate HeroBanner3 headings */}
      <HeroBanner3
        backgroundImage="/Lists/bg.jpg"
        headingText={t("heroMain")}
        italicText={t("heroItalic")}
      />

      <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
        <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {t("needInspiration")}
          </motion.h2>

          {/* 5) Translate intro paragraph, with line breaks handled by whitespace-pre-line */}
          <p className="text-base leading-relaxed text-gray-600 w-[80%] sm:max-w-6xl lg:max-w-7xl text-justify mx-auto whitespace-pre-line">
            {t("introParagraph")}
          </p>
        </div>

        {/* Buttons for each occasion */}
        <div className="order-2 sm:order-1 z-20 my-14 flex flex-col md:flex-row gap-[15px] sm:gap-6 flex-nowrap">
          <a href="#">
            <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              {t("graduation")}
            </button>
          </a>
          <a href="#">
            <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              {t("christmas")}
            </button>
          </a>
          <a href="#">
            <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              {t("birthday")}
            </button>
          </a>
          <a href="#">
            <button className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent">
              {t("babyShower")}
            </button>
          </a>
        </div>

        {/* FocusCards component (if you want these card titles translated, you can do so similarly) */}
        <div className="sm:order-2 order-1 w-full h-fit">
          <FocusCards cards={cards} />
        </div>
      </div>
    </>
  );
};

export default Lists;