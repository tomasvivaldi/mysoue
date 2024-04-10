"use client";

import React, { useEffect, useState } from "react";

export const RedLogosBanner = ({
  items,
  direction = "left",
  speed = "fast",
  className,
}: {
  items: {
    imageUrl: string;
    altText?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
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
      className={`min-w-full border-b border-t border-red-500 scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to right,transparent,white 20%,white 80%,transparent)] ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap ${
          start && "animate-scroll"
        }`}
      >
        {items.map((item, idx) => (
          <li
            className="w-[200px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[450px]"
            key={idx}
          >
            <img
              src={item.imageUrl}
              alt={item.altText || `Image ${idx}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
