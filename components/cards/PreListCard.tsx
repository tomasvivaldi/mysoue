// /components/PreListCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PreListCardProps {
  img: string;
  title: string;
  description: string;
  id: string;
  href?: string;
}

const PreListCard: React.FC<PreListCardProps> = ({
  id,
  img,
  title,
  description,
  href,
}) => {
  return (
    <Link
      href={href || `/dashboard/prelists/${id}`}
      passHref
      className="relative w-[250px] group rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="min-h-[300px] relative">
        <Image
          className="absolute inset-0 w-full h-full transition duration-500 ease-in-out rounded-lg"
          src={img}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />

        <div className="absolute bottom-0 w-full bg-[#000]/[0.6] backdrop-blur-sm group-hover:transition-all duration-500 ease-in-out rounded-b-lg">
          <div className="h-full flex flex-col justify-between transition-all duration-500 ease-in-out text-white">
            <h3 className="text-center font-normal py-3 group-hover:py-0 group-hover:pt-2 px-1 transition-all duration-500 ease-in-out font-nunito">
              {title}
            </h3>
            <div className="opacity-0 -my-2 group-hover:my-3 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 text-left font-extralight text-xs m-4 transition-all duration-500 ease-in-out font-nunito">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PreListCard;