"use client";
import Head from "next/head";
import React from "react";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Mysoue</title>
      </Head>
      <div className="min-h-screen flex justify-center items-center bg-[#FBF9F4]">
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-[#A5282C] rounded-2xl mx-8">
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            Our Blog is Coming Soon!
          </h2>
          <p className="text-md md:text-lg text-white mt-4 max-w-2xl">
            We're working on something exciting! Soon, you'll be able to explore
            articles on trends, gifting ideas, and more. Stay tuned!
          </p>
        </div>
      </div>
    </>
  );
}