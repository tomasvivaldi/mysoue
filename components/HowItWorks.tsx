"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const [highlightedImage, setHighlightedImage] = useState(1);

  const highlightImage = (imageNumber: React.SetStateAction<number>) => {
    setHighlightedImage(imageNumber);
  };

  const imageVariants = {
    highlighted: {
      opacity: 1,
      filter: "grayscale(0%)",
      scale: 1.05,
      zIndex: 20,
    },
    nonHighlighted: {
      opacity: 0.8,
      filter: "grayscale(100%)",
      scale: 1,
      zIndex: 10,
    },
  };

  const texts = [
    "Start: Embark on an exciting journey with Thailand's pioneer in online wishlists – it's completely free!",
    "Sharing: Easily share your wishlist with friends and family for any joyous occasion.",
    "Unwrap: Enjoy unwrapping gifts that truly match your desires and preferences.",
  ];

  return (
    <div className="flex flex-col h-fit w-full lg:paddings2 paddings">
      <h1 className="heading1 self-center py-6 sm:py-16">How Does It Work?</h1>
      <div className="flex flex-row h-fit w-full justify-center">
        <div className="relative items-center justify-center md:px-10 py-4 w-1/2 hidden md:flex">
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              className={`rounded-lg absolute border border-black shadow-lg ${
                num === 1
                  ? "top-8 right-8"
                  : num === 2
                  ? "top-14"
                  : "top-4 left-8"
              } w-[300px] h-[400px]`}
              initial={
                highlightedImage === num ? "highlighted" : "nonHighlighted"
              }
              animate={
                highlightedImage === num ? "highlighted" : "nonHighlighted"
              }
              variants={imageVariants}
              transition={{ duration: 0.5 }}
            >
              <Image
                alt={`Image ${num}`}
                src={`/HowItWorks${num}.png`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col space-y-6 w-full md:w-1/2  sm:x-paddings md:px-0">
          <h2 className="heading2">Start Your Wishlist Journey</h2>
          <p className="text-xs md:text-sm lg:text-lg">
            {highlightedImage > 0 && texts[highlightedImage - 1]}
          </p>
          <div className="flex space-x-4">
            <button onClick={() => highlightImage(1)} className="z-30">
              Start
            </button>
            <button onClick={() => highlightImage(2)} className="z-30">
              Sharing
            </button>
            <button onClick={() => highlightImage(3)} className="z-30">
              Unwrap
            </button>
          </div>
          <blockquote className="p-4 border-l-4 border-gray-300">
            <p className="italic">
              “Intuitive and easy to make shareable lists for the holidays.”
            </p>
            <footer className="mt-1 text-sm font-medium">
              Daniel Zakowski
            </footer>
            <footer className="text-sm">CEO @ Ready, Set, Food!</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
