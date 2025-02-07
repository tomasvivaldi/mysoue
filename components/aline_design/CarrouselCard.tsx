import React from "react";
import Image from "next/image";

interface CarrouselCardProps {
  img: string;
  postpreview: string;
}

const CarrouselCard: React.FC<CarrouselCardProps> = ({ img, postpreview }) => {
  return (
    <div className="relative min-w-[300px] sm:min-w-[400px] min-h-[300px] sm:min-h-[400px] group">
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={img}
        alt={postpreview}
        width={456}
        height={456}
      />
      <div className="absolute bottom-0 w-full bg-transparent hover:bg-[#F4E8D0]/[0.9] backdrop-blur-sm group-hover:h-full">
        <div className="h-full flex flex-col justify-between">
          <div className="hidden group-hover:flex text-left font-extralight text-xs m-4">
            <p>{postpreview}</p>
          </div>
          <div className="flex justify-between mt-2 text-black text-[10px] font-extralight">
            {/* Additional details or actions can go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrouselCard;