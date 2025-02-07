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
import HeroBanner2 from "@/components/aline_design/HeroBanner2";
import SolidButton from "@/components/buttons/SolidButton";

const OurLittleStory = () => {
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
      <HeroBanner2 />
      <div className="  flex flex-col p-4 x-paddings ">
        <div className="text-center w-[95%] mx-auto my-4 bg-[#FEFAF4] py-24 rounded-3xl">
        <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            a bit about ourselves
          </motion.h2>
          <p className="text-base leading-relaxed text-gray-600 w-[80%] sm:w-[50%] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <OurAbout/>
        <Founders />
        <BottomBanner />
      </div>
    </>
  );
};

export default OurLittleStory;
