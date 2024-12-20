import React from "react";
import Image from "next/image";

interface CarrouselCardProps {
  img: string;
//   activity: string;
//   type: string;
//   date: string;
  postpreview: string;
}

const CarrouselCard: React.FC<CarrouselCardProps> = ({
  img,
//   activity,
//   type,
//   date,
  postpreview,
}) => {
  return (
    <div
     
      className="relative min-w-[400px] min-h-[400px] group"
    >
     
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={img}
          alt={postpreview}
          width={456}
          height={456}
        />
        <div className="absolute bottom-0 w-full bg-transparent hover:bg-[#F4E8D0]/[0.9] backdrop-blur-sm group-hover:h-full">
          <div className="h-full flex flex-col justify-between">
            {/* <h3 className="text-center text-black font-normal pt-3 px-1 hover:pt-8">
              {activity}
            </h3> */}
            <div className="hidden group-hover:flex text-left font-extralight text-xs m-4">
              <p>{postpreview}</p>
            </div>
            <div className="flex justify-between mt-2 text-black text-[10px] font-extralight">

            </div>
          </div>
        </div>
     
    </div>
  );
};

export default CarrouselCard;
