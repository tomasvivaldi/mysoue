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
    "Embark on an exciting journey with Thailand's pioneer in online wishlists – it's completely free! \n・STEP 1 : LOGIN\n・STEP 2 : CHOOSE THE WISH LIST YOU WANNA SET UP\n・STEP 3 : ADD your favorite items",
    "Easily share your wishlist with friends and family for any joyous occasion.",
    "Enjoy unwrapping gifts that truly match your desires and preferences.",
  ];

  const renderText = (text: string) => {
    // Split the text by "\n" and map to an array of JSX elements
    const paragraphs = text.split("\n");
    return (
      <div>
        {paragraphs.map((paragraph, index) => (
          // React.Fragment does not create an actual DOM element
          <React.Fragment key={index}>
            {paragraph}
            {index < paragraphs.length - 1 && <br />}
            {index < paragraphs.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  };
  return (
    <div className="flex flex-col h-fit w-full lg:paddings2 paddings md:mb-20 ">
      <h1 className="heading1 self-center py-6 sm:py-16 font-simplemichael">
        How does it work?
      </h1>
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
                src={`/Works${num}.png`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col space-y-6 w-full md:w-1/2  sm:x-paddings md:px-0">
          <h2 className="heading2 font-simplemichael">
            Start your wishlist journey with us
          </h2>

          <div className="flex space-x-4">
            <button
              onClick={() => highlightImage(1)}
              className={`z-30 font-nunito  ${
                highlightedImage === 1
                  ? " underline-offset-4 underline decoration-[#B72228]"
                  : " hover:underline hover:underline-offset-4 hover:decoration-[#B72228] hover:font-medium"
              }`}
            >
              Start
            </button>
            <button
              onClick={() => highlightImage(2)}
              className={`z-30 font-nunito ${
                highlightedImage === 2
                  ? " underline-offset-4 underline decoration-[#B72228]"
                  : " hover:underline hover:underline-offset-4 hover:decoration-[#B72228] hover:font-medium"
              }`}
            >
              Sharing
            </button>
            <button
              onClick={() => highlightImage(3)}
              className={`z-30 font-nunito ${
                highlightedImage === 3
                  ? " underline-offset-4 underline decoration-[#B72228]"
                  : " hover:underline hover:underline-offset-4 hover:decoration-[#B72228] hover:font-medium"
              }`}
            >
              Unwrap
            </button>
          </div>

          <div className="text-xs md:text-sm lg:text-lg font-nunito">
            {highlightedImage > 0 && renderText(texts[highlightedImage - 1])}
          </div>
          {highlightedImage > 1 && (
            <blockquote className="p-4 border-l-4 border-[#B72228]">
              <p className="italic font-nunito">
                “Intuitive and easy way to make shareable lists for any
                occasion!”
              </p>
              <div className="flex flex-row items-center gap-4">
                <p className="mt-1 text-3xl font-medium font-bluewind tracking-wide">
                  Luiza Torrezani,
                </p>
                <p className="text-sm font-nunito ">Co-founder of Mysoue</p>
              </div>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
