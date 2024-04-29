"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export const RedLogosBanner = ({ direction = "left", speed = "fast" }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`min-w-full scroller relative z-20 max-w-7xl overflow-hidden border-b border-t border-red-500 `}
      style={{
        // color: textColor,
        // backgroundColor: bgColor,
        maskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 py-2 w-max flex-nowrap ${
          start && "animate-scroll"
        }`}
      >
        <li
          className="w-[200px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[300px] my-auto"
          key={4}
        >
          <Image
            quality={75}
            height={127.6}
            width={500.0}
            src="/Horizontal/Logo-Mysoue-Horizontal_2.png"
            alt={`Logo-Mysoue-Horizontal_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[150px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[200px] my-auto"
          key={1}
        >
          <Image
            quality={75}
            height={115.9}
            width={195.1}
            src="/Symbol/Logo-Mysoue-Symbol_2.png"
            alt={`Logo-Mysoue-Symbol_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[150px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[200px] my-auto"
          key={2}
        >
          <Image
            quality={75}
            height={140.5}
            width={230.9}
            src="/Vertical/Logo-Mysoue-Vertical_2.png"
            alt={`Logo-Mysoue-Vertical_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[300px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[400px] my-auto"
          key={3}
        >
          <Image
            quality={75}
            height={140.1}
            width={442.1}
            src="/Stamp/Logo-Mysoue-Stamp_2.png"
            alt={`Logo-Mysoue-Stamp_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[200px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[300px] my-auto"
          key={4}
        >
          <Image
            quality={75}
            height={127.6}
            width={500.0}
            src="/Horizontal/Logo-Mysoue-Horizontal_2.png"
            alt={`Logo-Mysoue-Horizontal_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[150px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[200px] my-auto"
          key={1}
        >
          <Image
            quality={75}
            height={115.9}
            width={195.1}
            src="/Symbol/Logo-Mysoue-Symbol_2.png"
            alt={`Logo-Mysoue-Symbol_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[150px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[200px] my-auto"
          key={2}
        >
          <Image
            quality={75}
            height={140.5}
            width={230.9}
            src="/Vertical/Logo-Mysoue-Vertical_2.png"
            alt={`Logo-Mysoue-Vertical_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
        <li
          className="w-[300px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[400px] my-auto"
          key={3}
        >
          <Image
            quality={75}
            height={140.1}
            width={442.1}
            src="/Stamp/Logo-Mysoue-Stamp_2.png"
            alt={`Logo-Mysoue-Stamp_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
      </ul>
    </div>
  );
};
