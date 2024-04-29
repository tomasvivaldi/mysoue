import React, { ReactNode } from "react";
import Image from "next/image";

type FolderNotchProps = {
  children: ReactNode; // Use ReactNode for typing children
};

const FolderNotch: React.FC<FolderNotchProps> = ({ children }) => {
  // FolderNotch.jsx

  return (
    <div className="relative bg-[#fff8e9] text-left  border-t border-red-500">
      {/* Pseudo-element for the notch */}
      <div className="absolute inset-x-0 top-0 transform -translate-y-[99%]">
        <div
          className="-ml-2  bg-[#fff8e9] border-t border-r border-l border-red-500 rounded-tl-full rounded-tr-full h-12 w-64 mx-auto
        flex flex-row justify-center items-center gap-4"
        >
          <Image
            src="/Symbol/Logo-Mysoue-Symbol_2.png"
            alt="LinkedIn"
            width={55}
            height={55}
          />
          <Image
            src="/Horizontal/Logo-Mysoue-Horizontal_2.png"
            alt="LinkedIn"
            width={100}
            height={55}
          />
        </div>
      </div>

      {/* Content of the component */}
      {children}
    </div>
  );
};

export default FolderNotch;
