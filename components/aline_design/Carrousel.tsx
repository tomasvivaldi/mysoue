"use client";
import React, { useState, useRef } from "react";
import CarrouselCard from "./CarrouselCard";
import GhostButtonBlack from "../GhostButtonBlack";

interface CarrouselData {
//   activity: string;
  img: string;
//   type: string;
//   date: string;
  postpreview: string;
}

const data: CarrouselData[] = [
  {
    // activity: "Immerse Yourself in Wild Patagonia",
    img: "/Carrousel/carrousel-1.jpg",
    // type: "hiking",
    // date: "October 8, 2020",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\n Morbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
  {
    // activity: "Milford Track Bookings Open TODAY!",
    img: "/Carrousel/carrousel-2.jpg",
    // type: "hiking",
    // date: "August 17, 2020",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\n Morbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
  {
    // activity: "Lydia Bradey’s 6th Everest summit",
    img: "/Carrousel/carrousel-3.jpg",
    // type: "mountaineering",
    // date: "March 4, 2020",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\n Morbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
  },
  {
    // activity: "Thank you for caring! exploreGO gives back 10% to local communities",
    img: "/Carrousel/carrousel-4.jpg",
    // type: "exploreGIVE",
    // date: "March 1, 2020",
    postpreview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel tortor ac elit placerat laoreet. \n\n Morbi at dolor ex. Duis lacinia risus nec odio fermentum pretium. Fusce imperdiet tortor sit amet nunc ultrices, in mollis libero ullamcorper. Sed non ex massa. Duis volutpat lobortis libero vel congue. Quisque sed dapibus turpis. Sed sollicitudin justo eget",
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
    <div className="w-[90%] px-[5%] mx-auto bg-[#FEFAF4]">
        <div className="flex flex-row justify-between py-4">
            <h3 className="text-5xl font-light">WHAT THEY SAY ABOUT US</h3>
            <GhostButtonBlack text={"FOLLOW US"}></GhostButtonBlack>
        </div>
      <div
        className="flex flex-row gap-4 items-center overflow-x-scroll shrink-0 h-fit"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {data.map((el, index) => (
          <CarrouselCard
            key={index}
            img={el.img}
            // activity={el.activity}
            // type={el.type}
            // date={el.date}
            postpreview={el.postpreview}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 font-extralight">
        <button
          className={`mx-2 flex flex-row gap-2 ${
            scrollPosition === 0 ? "opacity-50 cursor-default" : "cursor-pointer"
          }`}
          onClick={scrollToLeft}
          disabled={scrollPosition === 0}
          aria-label="Scroll to left"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

          <p>Previous</p>
        </button>
        <button
          className={`mx-2 flex flex-row gap-2 ${
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>

        </button>
      </div>
    </div>
  );
};

export default Carrousel;
