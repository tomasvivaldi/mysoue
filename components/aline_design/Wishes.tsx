"use client";

import Image from "next/image";
import { Plus, Menu, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import WishlistsFeatures from "./WishlistsFeatures";

export default function Wishes() {
  const t = useTranslations("Wishes");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 my-12 flex flex-col gap-8 sm:gap-16">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl   italic  ">
        {t("pageTitle")}
      </h1>

      <WishlistsFeatures />

      {/* Flex container */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* CREATE Card */}
        <div className="flex flex-col w-full sm:w-[48%] md:w-[30%] bg-[#FFF9E8] border border-black rounded-3xl p-6 items-center justify-between min-h-[300px] gap-4">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-xl text-black font-medium">{t("create")}</h2>
            <Plus className="w-6 h-6" />
          </div>

          {/* Centered Image */}
          <div className="flex-grow flex items-center justify-center">
            <Image
              src="/Wishes/create.svg"
              alt="Create Image"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>

          <a href="/lists" className="w-full flex justify-center py-2 px-4 rounded-full bg-transparent hover:bg-[#A5282C] text-[#C6B8A2] hover:text-white border border-[#C6B8A2] text-sm transition-colors">
            {t("getInspired")}
          </a>
        </div>

        {/* SORT Card */}
        <div className="flex flex-col w-full sm:w-[48%] md:w-[30%] bg-[#FFF9E8] border border-black rounded-3xl p-6 items-center justify-between min-h-[300px] gap-4">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-xl text-black font-medium">{t("sort")}</h2>
            <Menu className="w-6 h-6" />
          </div>

          <div className="flex-grow flex items-center justify-center">
            <Image
              src="/Wishes/sort.svg"
              alt="Sort Image"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>

          <a href="/explore" className="w-full flex justify-center py-2 px-4 rounded-full bg-transparent hover:bg-[#A5282C] text-[#C6B8A2] hover:text-white border border-[#C6B8A2] text-sm transition-colors">
            {t("browseItems")}
          </a>
        </div>

        {/* SHARE Card */}
        <div className="flex flex-col w-full sm:w-[48%] md:w-[30%] bg-[#FFF9E8] border border-black rounded-3xl p-6 items-center justify-between min-h-[300px] gap-4">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-xl text-black font-medium">{t("share")}</h2>
            <ArrowUpRight className="w-6 h-6" />
          </div>

          <div className="flex-grow flex items-center justify-center">
            <Image
              src="/Wishes/share.svg"
              alt="Share Image"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>

          <a href="/login" className="w-full flex justify-center py-2 px-4 rounded-full bg-transparent hover:bg-[#A5282C] text-[#C6B8A2] hover:text-white border border-[#C6B8A2] text-sm transition-colors">
            {t("signInToShare")}
          </a>
        </div>
      </div>
    </div>
  );
}