"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ContentLeft from "@/components/ContentLeft";
import ContentRight from "@/components/ContentRight";
import CenterContent from "@/components/CenterContent";

const CreateAList = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Head>
        <title>Our little story</title>
      </Head>
      <div className="relative w-[85%] mx-auto x-paddings my-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Gift with ribbon"
            className="mb-4 rounded-lg object-cover w-full h-full"
            height="300"
            src="/bg1.jpg"
            style={{
              aspectRatio: "520/300",
              objectFit: "cover",
            }}
            width="520"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black bg-opacity-50 rounded-lg" />

        {/* Text Content */}
        <div className="relative z-20 flex flex-col items-start justify-center h-fit text-left p-4 my-12">
          <h1 className="heading1 text-white mb-4 max-w-sm">
            Create your wishlist now!
          </h1>
          <p className="text-white max-w-md">
            Provide all the details for the gift list you'd like to create. This
            ensures your loved ones have the information they need. Whether
            someone wants to create a surprise list and share it with friends or
            offer it to you, everything is possible here.
          </p>
        </div>
      </div>
      <ContentLeft />
      <ContentRight />
      <CenterContent />
    </>
  );
};
export default CreateAList;
