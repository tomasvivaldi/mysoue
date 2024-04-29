"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const gifts = [
  { src: "/product1.jpg", alt: "Sunglasses" },
  { src: "/product2.jpg", alt: "Bag" },
  { src: "/product3.jpg", alt: "Makeup" },
  { src: "/product4.jpg", alt: "Bra" },
  { src: "/product5.png", alt: "Cream" },
  // { src: "/xmas.jpg", alt: "Headphones" },
];

export default function GiftStack() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {gifts.map((gift, index) => (
        <div key={index} className="group relative">
          <Image
            height={250}
            width={250}
            src={gift.src}
            alt={gift.alt}
            className="w-[150px] h-[150px] rounded-lg border-2 border-[#CDBEAB]"
          />
          {/* <motion.button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#fbf9f4] text-black px-6 py-2 rounded-full text-xs font-light shadow-lg
            hover:scale-105 active:scale-95 whitespace-nowrap"
            onClick={() => console.log(`Gift ${index + 1} selected`)}
          >
            THIS IS MY GIFT
          </motion.button> */}
        </div>
      ))}
    </div>
  );
}
