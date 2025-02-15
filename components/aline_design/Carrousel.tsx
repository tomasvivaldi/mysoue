"use client";

import React, { useState, useRef } from "react";
import GhostButtonBlack from "../GhostButtonBlack";
import { DirectionAwareHover } from "../ui/DirectionAwereHover";
import { useTranslations } from "next-intl";

interface CarrouselItem {
  img: string;
  postpreview: string;
}

export default function Carrousel() {
  // 1) Load translations for the "Carrousel" namespace
  const t = useTranslations("Carrousel");

  // 2) Build your data array using the translation keys
  const data: CarrouselItem[] = [
    {
      img: "/Carrousel/carrousel-1.jpg",
      postpreview: t("postPreview1")
    },
    {
      img: "/Carrousel/carrousel-2.jpg",
      postpreview: t("postPreview2")
    },
    {
      img: "/Carrousel/carrousel-3.jpg",
      postpreview: t("postPreview3")
    },
    {
      img: "/Carrousel/carrousel-4.jpg",
      postpreview: t("postPreview4")
    }
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: scrollPosition - containerRef.current.clientWidth / 2,
        behavior: "smooth"
      });
    }
  };

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: scrollPosition + containerRef.current.clientWidth / 2,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 mx-auto bg-[#FEFAF4]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4">
        <h3 className="text-3xl sm:text-5xl font-light text-center sm:text-left">
          {t("title")}
        </h3>
        <div className="mt-4 sm:mt-0">
          <GhostButtonBlack text={t("followUs")} />
        </div>
      </div>

      {/* Carousel Scroll Container */}
      <div
        className="flex gap-4 items-center overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {data.map((el, index) => (
          <DirectionAwareHover key={index} imageUrl={el.img}>
            {el.postpreview}
          </DirectionAwareHover>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 font-extralight text-sm sm:text-base">
        {/* Previous Button */}
        <button
          className={`mx-2 flex items-center gap-2 ${
            scrollPosition === 0 ? "opacity-50 cursor-default" : "cursor-pointer"
          }`}
          onClick={scrollToLeft}
          disabled={scrollPosition === 0}
          aria-label="Scroll to left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <p>{t("previous")}</p>
        </button>

        {/* Next Button */}
        <button
          className={`mx-2 flex items-center gap-2 ${
            scrollPosition ===
            containerRef.current?.scrollWidth! - containerRef.current?.clientWidth!
              ? "opacity-50 cursor-default"
              : "cursor-pointer"
          }`}
          onClick={scrollToRight}
          disabled={
            scrollPosition ===
            containerRef.current?.scrollWidth! - containerRef.current?.clientWidth!
          }
          aria-label="Scroll to right"
        >
          <p>{t("next")}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}