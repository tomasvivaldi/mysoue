import React from "react";
import Image from "next/image";

const Hero2 = () => {
  return (
    <div className="relative w-full h-screen -mt-[100px]">
      <Image
        alt="Gifting made authentic"
        className="w-full h-full object-cover"
        width={2000}
        height={1000}
        src="/hero.png"
      />
      <div className="absolute bottom-0 right-0 p-16 text-white text-right">
        <h1 className="text-7xl font-nunito font-medium">GIFTING</h1>
        <p className="text-6xl font-simplemichael font-extralight">
          made authentic
        </p>
        <Image
          alt="Gifting made authentic"
          className="w-[350px] py-8 ml-auto"
          width={4422}
          height={1401}
          src="/Stamp/Logo-Mysoue-Stamp_4.png"
        />
      </div>
    </div>
  );
};

export default Hero2;
