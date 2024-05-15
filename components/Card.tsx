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
}

const Card: React.FC<CardProps> = ({
  id,
  img,
  activity,
  type,
  date,
  postpreview,
}) => {
  console.log("id", id);
  return (
    <Link
      href={`/dashboard/my-wishlists/${id}`}
      passHref
      className="relative w-[250px] group rounded-lg
                 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
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
          className="absolute bottom-0 w-full bg-[#000]/[0.6] backdrop-blur-sm group-hover:
                      transition-all duration-500 ease-in-out rounded-b-lg"
        >
          <div
            className="h-full flex flex-col justify-between transition-all duration-500 ease-in-out
          text-white"
          >
            <h3
              className="text-center  font-normal pt-3 px-1 
                           transition-all duration-500 ease-in-out font-nunito"
            >
              {activity}
            </h3>
            <div
              className="opacity-0 -my-2 group-hover:my-1 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 
              text-left font-extralight text-xs m-4 transition-all duration-500 ease-in-out font-nunito"
            >
              <p>{postpreview}</p>
            </div>

            <div
              className="flex justify-between mt-2 text-white text-[10px] font-extralight
                            transition-all duration-500 ease-in-out"
            >
              <div className="flex mx-4 mb-4 flex-row">
                <img
                  className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] mt-1 mx-2"
                  src="/images/card01.png"
                />
                <h4 className="mt-[2px] font-nunito text-[13px]">{type}</h4>
              </div>
              <div className="flex mx-4 mb-4 flex-row">
                <img
                  className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] mt-1 mx-2"
                  src="/images/card02.png"
                />
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
