"use client";

import Head from "next/head";
import React from "react";
import { useTranslations } from "next-intl";

import HeroBanner3 from "@/components/aline_design/HeroBanner3";

export default function Blog() {
  const t = useTranslations("Blog");

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="min-h-screen flex justify-center items-center bg-[#FBF9F4]">
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-[#A5282C] rounded-2xl mx-8">
          {/* 4) Replace hard-coded texts with translation keys */}
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            {t("comingSoonHeading")}
          </h2>
          <p className="text-md md:text-lg text-white mt-4 max-w-2xl">
            {t("comingSoonText")}
          </p>
        </div>
      </div>
    </>
  );
}