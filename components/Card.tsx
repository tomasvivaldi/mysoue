import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  img: string;
  activity: string;
  type: string;
  date: string;
  postpreview: string;
  id: string;
  href?: string; // New prop for the link href
}

const Card: React.FC<CardProps> = ({
  id,
  img,
  activity,
  type,
  date,
  postpreview,
  href,
}) => {
  
  return (
    <Link
      href={href || `/dashboard/my-wishlists/${id}`}
      passHref
      className="relative w-[250px] group rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="min-h-[300px] relative">
        <Image
          className="absolute inset-0 w-full h-full transition duration-500 ease-in-out rounded-lg"
          src={img}
          alt="image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />

        <div
          className="absolute bottom-0 w-full bg-[#000]/[0.6] backdrop-blur-sm group-hover:transition-all duration-500 ease-in-out rounded-b-lg"
        >
          <div
            className="h-full flex flex-col justify-between transition-all duration-500 ease-in-out text-white"
          >
            <h3
              className="text-center font-normal pt-3 px-1 transition-all duration-500 ease-in-out font-nunito"
            >
              {activity}
            </h3>
            <div
              className="opacity-0 -my-2 group-hover:my-1 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 text-left font-extralight text-xs m-4 transition-all duration-500 ease-in-out font-nunito"
            >
              <p>{postpreview}</p>
            </div>

            <div
              className="flex justify-between mt-2 text-white text-[10px] font-extralight transition-all duration-500 ease-in-out"
            >
              <div className="flex mx-4 mb-4 flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] mt-1 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                  />
                </svg>
                <h4 className="mt-[2px] font-nunito text-[13px] whitespace-nowrap truncate">
                  {type}
                </h4>
              </div>
              <div className="flex mx-4 mb-4 flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] mt-1 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <h4 className="mt-[2px] font-nunito text-[13px]">{date}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;