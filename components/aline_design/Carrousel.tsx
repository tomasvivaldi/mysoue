"use client";
import React, { useState, useRef } from "react";
import CarrouselCard from "./CarrouselCard";
import GhostButtonBlack from "../GhostButtonBlack";

interface CarrouselData {
  img: string;
  postpreview: string;
}

const data: CarrouselData[] = [
  {
    img: "/Carrousel/carrousel-1.jpg",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\nMorbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
  {
    img: "/Carrousel/carrousel-2.jpg",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\nMorbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
  {
    img: "/Carrousel/carrousel-3.jpg",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\nMorbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
  {
    img: "/Carrousel/carrousel-4.jpg",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\nMorbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
];

const Carrousel: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  const scrollToLeft = (): void => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: scrollPosition - containerRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const scrollToRight = (): void => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: scrollPosition + containerRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 mx-auto bg-[#FEFAF4]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4">
        <h3 className="text-3xl sm:text-5xl font-light text-center sm:text-left">
          WHAT THEY SAY ABOUT US
        </h3>
        <div className="mt-4 sm:mt-0">
          <GhostButtonBlack text="FOLLOW US" />
        </div>
      </div>

      {/* Carousel Scroll Container */}
      <div
        className="flex gap-4 items-center overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {data.map((el, index) => (
          <CarrouselCard
            key={index}
            img={el.img}
            postpreview={el.postpreview}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 font-extralight text-sm sm:text-base">
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
          <p>Previous</p>
        </button>
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
          <p>Next</p>
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
};

export default Carrousel;