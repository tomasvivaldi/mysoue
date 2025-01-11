"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import SolidButton from "@/components/buttons/SolidButton";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";

const List = () => {
  const allItems = [
    { id: 1, name: "Car Seat", price: "500 €", img: "/List/card1.png" },
    { id: 2, name: "Striped Pajamas", price: "20 €", img: "/List/card2.png" },
    { id: 3, name: "Toy Deer", price: "20 €", img: "/List/card3.png" },
    { id: 4, name: "Diapers", price: "30 €", img: "/List/card4.png" },
    { id: 5, name: "Bottle", price: "10 €", img: "/List/card5.png" },
    { id: 6, name: "Pacifier", price: "5 €", img: "/List/card6.png" },
    { id: 7, name: "Car Seat", price: "500 €", img: "/List/card1.png" },
    { id: 8, name: "Striped Pajamas", price: "20 €", img: "/List/card2.png" },
    { id: 9, name: "Toy Deer", price: "20 €", img: "/List/card3.png" },
  ];

  // State to manage visible items
  const [visibleItems, setVisibleItems] = useState(allItems.slice(0, 6));

  const handleLoadMore = () => {
    const newVisibleCount = visibleItems.length + 3;
    setVisibleItems(allItems.slice(0, newVisibleCount));
  };

  return (
    <>
      <Head>
        <title>Wish List</title>
      </Head>
      <SolidButton
        text="start now"
        href="/login"
        className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]"
      />
      <HeroBanner3
        backgroundImage={"/List/bg.jpg"}
        headingText="FOR ALL"
        italicText="wishes"
      />
      <div className="flex flex-col p-4 x-paddings items-center mb-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="relative w-[330px] h-[330px] rounded-lg shadow-md flex flex-col items-center group hover:shadow-xl transition-shadow pb-10 mb-8"
            >
              {/* "+" Button */}
              <button className="z-10 absolute top-4 left-4 bg-[#A5282C] w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </button>
              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full object-contain absolute"
              />
              {/* Name */}
              <h3 className="text-lg font-semibold text-center">{item.name}</h3>
              {/* Price */}
              <p className="z-10 absolute bottom-0 inset-x-0 bg-[#FFF9E8] text-xl text-[#C6B8A2] rounded-b-3xl border border-[#C6B8A2] py-2 text-center">{item.price}</p>
              {/* Checkbox */}
              <div className="mt-2">
                <input type="checkbox" className="form-checkbox text-pink-500" />
              </div>
            </div>
          ))}
        </motion.div>
        {visibleItems.length < allItems.length && (
          <button
            onClick={handleLoadMore}
            className="mt-8 px-6 py-2 bg-[#A5282C] text-white rounded-md hover:bg-[#FF6B6B]"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default List;