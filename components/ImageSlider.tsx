"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import heroBackground1 from "../public/hero1.webp";
import heroBackground2 from "../public/hero2.webp";
import heroBackground3 from "../public/hero3.webp";

const ImageSlider = () => {
  const images = [heroBackground1, heroBackground2, heroBackground3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentImageIndex]);

  return (
    <div className="relative h-screen overflow-hidden">
      {images.map((imgSrc, index) => (
        <div
          key={index}
          className={`
            absolute top-0 left-0 w-full h-full
            ${index === currentImageIndex ? "opacity-100" : "opacity-0"}
            ${
              index === 0
                ? "animate-zoomAndPan1"
                : index === 1
                ? "animate-zoomAndPan2"
                : "animate-zoomAndPan3"
            }
            transition-opacity duration-[10000ms] 
          `}
        >
          <Image
            src={imgSrc}
            alt={`Slide ${index}`}
            layout="fill"
            objectFit="cover"
            objectPosition={
              index === 0 ? "top right" : index === 1 ? " center" : "top"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
