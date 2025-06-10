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
      <TopBanner2
        title={t("bannerTitle")}
        description={t("bannerDescription")}
        bgImage="/bg1.jpg"
      />
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
        <div className="flex flex-col gap-4 justify-center items-center w-full mb-20 ">
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {t("subtitle")}
          </motion.h2>

          <div className="flex flex-col gap-12 my-10 w-full x-paddings ">
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-center flex flex-col sm:flex-row justify-center gap-8"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <Image
                src="/story1.jpeg"
                alt="our-little-story-1"
                width={1556}
                height={1724}
                objectPosition="center"
                className="rounded-lg mx-auto md:my-auto w-44 md:w-72 grow-0 shrink-0 or"
              />
              <motion.div className=" flex flex-col my-auto" variants={fadeIn}>
                <h3 className="heading3 mb-2 font-simplemichael">
                  {t("dnaHeading")}
                </h3>
                <p className="body-regular font-nunito">{t("dnaText")}</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-center flex flex-col sm:flex-row justify-center gap-8"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {" "}
              <motion.div
                className="order-2 sm:order-1 flex flex-col my-auto"
                variants={fadeIn}
              >
                <h3 className="heading3 mb-2 font-simplemichael">
                  {t("soueHeading")}
                </h3>
                <p className="body-regular font-nunito">{t("soueText")}</p>
              </motion.div>
              <Image
                src="/story2.png"
                alt="our-little-story-1"
                width={1556}
                height={1724}
                objectPosition="center"
                className="order-1 sm:order-2 rounded-lg mx-auto md:my-auto w-44 md:w-72 grow-0 shrink-0"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-center flex flex-col sm:flex-row justify-center md:gap-4"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <Image
                src="/story3.png"
                alt="our-little-story-1"
                width={1556}
                height={1724}
                objectPosition="center"
                className="rounded-lg mx-auto md:my-auto w-44 md:w-72 grow-0 shrink-0"
              />
              <motion.div className=" flex flex-col my-auto" variants={fadeIn}>
                <h3 className="heading3 mb-2 font-simplemichael">
                  {t("valuesHeading")}
                </h3>
                <p className="body-regular font-nunito">{t("valuesText")}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <Banner2 />
        <TeamSection />
      </div>
    </>
  );
};

export default OurLittleStory;
