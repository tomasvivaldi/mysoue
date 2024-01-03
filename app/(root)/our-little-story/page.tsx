"use client";
import React from "react";
import { motion } from "framer-motion";
import TopBanner from "@/components/TopBanner";
import Head from "next/head";
import Image from "next/image";

const UeberMich = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Head>
        <title>Our Little Story</title>
      </Head>
      <TopBanner title="Our Little Story" />
      {/* Introduction Section */}
      <div className="  flex flex-col p-4 x-paddings ">
        <div className="flex flex-col gap-4 justify-center items-center w-full ">
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            A Little more About us
          </motion.h2>

          <div className="flex flex-col gap-32 my-24 w-full x-paddings">
            {/* Brief Overview */}
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-center "
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeIn}
                className="heading3 mb-2"
              ></motion.h3>
              <motion.p variants={fadeIn} className="body-regular"></motion.p>
            </motion.div>

            {/* Shiatsu Therapy Education */}
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-end"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeIn}
                className="heading3 mb-2"
              ></motion.h3>
              <motion.p variants={fadeIn} className="body-regular"></motion.p>
            </motion.div>

            {/* Teaching and Courses */}
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-start"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeIn}
                className="heading3 mb-2"
              ></motion.h3>
              <motion.p variants={fadeIn} className="body-regular"></motion.p>
            </motion.div>

            {/* KenShō Shiatsu Institute */}
            <motion.div
              variants={fadeIn}
              className="mb-6 max-w-3xl self-end"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeIn}
                className="heading3 mb-2"
              ></motion.h3>
              <motion.p variants={fadeIn} className="body-regular"></motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UeberMich;
