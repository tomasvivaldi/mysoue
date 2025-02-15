"use client";

import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useTranslations } from "next-intl";

import SolidButton from "@/components/buttons/SolidButton";
import HeroBanner2 from "@/components/aline_design/HeroBanner2";
import OurAbout from "@/components/aline_design/OurAbout";
import Founders from "@/components/aline_design/Founders";
import BottomBanner from "@/components/aline_design/BottomBanner";
import { FloatingButton } from "@/components/ui/FloatingButton";

const About = () => {
  // 1) Access strings from the "ourStory" namespace
  const t = useTranslations("about");

  // For your fade-in animation
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {/* 2) Use the translated page title */}
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>

      {/* 3) Translate "start now" */}
      <SolidButton text="Start Now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <FloatingButton/>

      <HeroBanner2 />

      <div className="flex flex-col p-4 x-paddings">
        <div className="text-center w-[95%] mx-auto my-4 bg-[#FEFAF4] py-24 rounded-3xl">
          {/* 4) Translate "a bit about ourselves" */}
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {t("bitAboutOurselves")}
          </motion.h2>

          {/* 5) Translate the paragraph */}
          <p className="text-base text-justify leading-relaxed text-gray-600 w-[80%] sm:w-[50%] mx-auto whitespace-pre-line">
            {t("introParagraph")}
          </p>
        </div>

        {/* Remaining sections */}
        <OurAbout />
        <Founders />
        <BottomBanner />
      </div>
    </>
  );
};

export default About;