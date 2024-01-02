"use client";
import React from "react";
import { motion } from "framer-motion";

interface MenuItem {
  text: string;
  url: string;
}

interface MenuSmallProps {
  menuItems: MenuItem[];
}

const MenuSmall: React.FC<MenuSmallProps> = ({ menuItems }) => {
  const getBorderAnimation = (index: number) => ({
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        delay: index * 0.3, // Delay increases with each item
      },
    },
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <div className="p-4">
      <motion.div
        className="flex items-center space-x-2 font-bold text-lg"
        variants={fadeIn}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <p className="text-2xl font-extralight">We Plan</p>
      </motion.div>
      <ol className="mt-4 font-light">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            className="-mr-24 my-4 pt-2  hover:bg-gray-400/20 hover:transition-all hover:duration-500 hover:ease-in-out"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a href={item.url} className="text-base pl-1">
              {item.text}
            </a>
            <motion.div
              className="h-[1px] bg-gray-400 left-0 origin-left"
              variants={getBorderAnimation(index)}
            />
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default MenuSmall;
