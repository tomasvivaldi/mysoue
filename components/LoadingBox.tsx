import Image from "next/image";
import React from "react";

interface LoadingBoxProps {
  imageSrc: string; // Path to the loading image
  imageAlt?: string; // Alt text for the image
  imageClassName?: string; // Optional className for the image
  containerClassName?: string; // Optional className for the container
}

function LoadingBox({
  imageSrc,
  imageAlt = "Loading...",
  imageClassName = "",
  containerClassName = "",
}: LoadingBoxProps) {
  return (
    <div className={`flex justify-center items-center animate-pulse duration-1000 w-full h-screen ${containerClassName}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        className={imageClassName}
        width={128} // Set the desired width
        height={128} // Set the desired height
      />
    </div>
  );
}

export default LoadingBox;