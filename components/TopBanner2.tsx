// components/TopBanner2.tsx
import Image from "next/image";
import React from "react";

type TopBanner2Props = {
  title: string;
  description: string;
  bgImage: string;
};

const TopBanner2: React.FC<TopBanner2Props> = ({
  title,
  description,
  bgImage,
}) => {
  return (
    <div className="relative w-[85%] h-[400px] mx-auto x-paddings my-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Gift with ribbon"
          className="mb-4 rounded-lg object-cover w-full h-full"
          height="300"
          src={bgImage}
          style={{
            aspectRatio: "520/300",
            objectFit: "cover",
          }}
          width="520"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-50 rounded-lg" />

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full text-left px-4">
        <h1 className="heading1 text-white mb-4 max-w-md">{title}</h1>
        <p className="text-white max-w-md">{description}</p>
      </div>
    </div>
  );
};

export default TopBanner2;
