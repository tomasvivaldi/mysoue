"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";
import SolidButton from "@/components/buttons/SolidButton";

const products = [
  {
    id: 1,
    name: "Product One",
    image: "/products/product1.jpg",
    price: "$29.99",
    description: "A great product to enhance your style.",
  },
  {
    id: 2,
    name: "Product Two",
    image: "/products/product2.jpg",
    price: "$39.99",
    description: "This product offers excellent quality and design.",
  },
  {
    id: 3,
    name: "Product Three",
    image: "/products/product3.jpg",
    price: "$19.99",
    description: "An affordable product with top-notch performance.",
  },
  {
    id: 4,
    name: "Product Four",
    image: "/products/product4.jpg",
    price: "$49.99",
    description: "A premium product for discerning customers.",
  },
  // Add more products as needed
];

export default function Explore() {
  return (
    <>
      <Head>
        <title>Explore Products | Mysoue</title>
      </Head>
        <SolidButton text="start now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
        <HeroBanner3
          backgroundImage={"/Lists/bg.jpg"}
          headingText="FOR ALL"
          italicText="wishes"
        />

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF4E7] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-neutral-700">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-neutral-900">
                      {product.price}
                    </span>
                    <Link
                      href={`/product/${product.id}`}
                      className="px-4 py-2 border border-black hover:bg-[#FFF9E8] rounded-full uppercase text-xs tracking-widest text-black bg-transparent"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}