"use client";
import React from "react";
import { motion } from "framer-motion";
import TopBanner from "@/components/TopBanner";
import Head from "next/head";
import Image from "next/image";
import TeamSection from "@/components/TeamSection";
import Banner2 from "@/components/Banner2";
import TopBanner2 from "@/components/TopBanner2";

const UeberMich = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Head>
        <title>Our little story</title>
      </Head>
      <TopBanner2
        title="Our little story"
        description="We are a dedicated team with a mission to make wishlists accessible to everyone"
        bgImage="/bg1.jpg"
      />
      <div className="  flex flex-col p-4 x-paddings ">
        <div className="flex flex-col gap-4 justify-center items-center w-full mb-20 ">
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            A little more About us
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
                className="rounded-lg mx-auto md:my-auto w-44 md:w-72 grow-0 shrink-0"
              />
              <motion.div className=" flex flex-col my-auto" variants={fadeIn}>
                <h3 className="heading3 mb-2 font-simplemichael">Our DNA</h3>
                <p className="body-regular font-nunito">
                  The very essence of our concept is the result of an alliance
                  between different cultures. We draw our inspiration not only
                  from our own experience, but also from our mixed cultural
                  heritage between South America and Europe.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-center flex flex-col sm:flex-row justify-center gap-8"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.div className=" flex flex-col my-auto" variants={fadeIn}>
                <h3 className="heading3 mb-2 font-simplemichael">Our “soué”</h3>
                <p className="body-regular font-nunito">
                  In French, “souhait” means wish. And that is all we are
                  about;"We're all about making your wishes come true,
                  eliminating worries, and creating space for meaningful moments
                  and cherished memories with your loved ones. That's our
                  mission – turning desires into delightful memories!"
                </p>
              </motion.div>
              <Image
                src="/story2.png"
                alt="our-little-story-1"
                width={1556}
                height={1724}
                objectPosition="center"
                className="rounded-lg mx-auto md:my-auto w-44 md:w-72 grow-0 shrink-0"
              />
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-center flex flex-col sm:flex-row justify-center md:gap-8"
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
                <h3 className="heading3 mb-2 font-simplemichael">Our values</h3>
                <p className="body-regular font-nunito">
                  our values are rooted in a desire to bring together and
                  cherish our loved ones. What could be more wonderful than
                  celebrating a moment in life without the hassle of individual
                  wishes, desires and budgets? All you have to think about is
                  celebrating, with no logistical constraints when it comes to
                  gifts.
                </p>
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

export default UeberMich;
