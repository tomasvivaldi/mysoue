"use client";

import React, { useEffect, useState } from "react";

export const SmallTextBanner = ({
  items,
  direction = "left",
  speed = "fast",
  className,
  extraWord,
  genericText,
  textColor,
  bgColor,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
  extraWord: string;
  genericText: string;
  textColor: string;
  bgColor: string;
}) => {
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
      className={`min-w-full scroller relative z-20 max-w-7xl overflow-hidden ${className}`}
      style={{
        color: textColor,
        backgroundColor: bgColor,
        // maskImage:
        //   "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 py-2 w-max flex-nowrap ${
          start && "animate-scroll"
        }`}
      >
        <span className="mx-2 my-auto">•</span>
        {items.map((item, idx) => (
          <li className="w-auto max-w-full relative flex-shrink-0 " key={idx}>
            <span className=" font-simplemichael">{genericText} </span>
            <span className=" font-simplemichael font-semibold ">{item}</span>
            {idx < items.length - 1 && <span className="mx-2">•</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
