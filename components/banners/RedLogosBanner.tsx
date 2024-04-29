"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export const RedLogosBanner = ({
  direction = "left",
  speed = "fast",
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  const scrollerRef = useRef<HTMLUListElement>(null); // Correctly type the useRef

  // Calculate the animation duration based on the speed prop
  const animationDuration =
    speed === "fast" ? "10s" : speed === "normal" ? "20s" : "80s";

  // Set the keyframe animation based on the direction prop
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  useEffect(() => {
    if (scrollerRef.current) {
      const scroller = scrollerRef.current;

      // Clone the children and append them to the end to create an infinite effect
      Array.from(scroller.children).forEach((child) => {
        const node = child as HTMLElement; // Type assertion to HTMLElement
        scroller.appendChild(node.cloneNode(true));
      });
    }
  }, []);

  return (
    <div
      className={`min-w-full border-b border-t border-red-500 scroller relative z-20 max-w-7xl overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className="flex gap-16 py-4 w-auto flex-nowrap"
        style={{
          animation: `${animationName} ${animationDuration} linear infinite`,
        }}
      >
        <li
          className="w-[150px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[200px] my-auto"
          key={1}
        >
          <Image
            height={1159}
            width={1951}
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
            height={1405}
            width={2309}
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
            height={1401}
            width={4421}
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
            height={1276}
            width={5000}
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
            height={1159}
            width={1951}
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
            height={1405}
            width={2309}
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
            height={1401}
            width={4421}
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
            height={1276}
            width={5000}
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
            height={1159}
            width={1951}
            src="/Symbol/Logo-Mysoue-Symbol_2.png"
            alt={`Logo-Mysoue-Symbol_2`}
            className=" w-full object-cover rounded-lg my-auto"
          />
        </li>
      </ul>
    </div>
  );
};
