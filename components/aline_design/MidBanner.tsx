import Image from "next/image";

import GhostButtonWhite from "../GhostButtonWhite";

export default function MidBanner() {
  return (
    <div className="relative mx-12 rounded-3xl h-[600px] overflow-hidden my-20">
      {/* Background Image */}
      <Image
        src="/MidBanner/bg.jpg"
        alt="Person smiling at phone in red sweater"
        width={1200}
        height={600}
        className="object-cover object-top scale-125 w-full h-full"
        priority
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/0" />

      {/* Text Content */}
      <div className="absolute inset-0 flex justify-end items-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-lg space-y-5 text-center -translate-x-1/2 -translate-y-6">
          <h1 className="space-y-1">
            <span className="block text-4xl font-light tracking-wide text-white sm:text-5xl lg:text-6xl">
              you want it?
            </span>
            <span className="block text-4xl font-light tracking-wide text-white sm:text-5xl lg:text-6xl">
              we got it.
            </span>
          </h1>
          <p className="text-lg text-white/90 sm:text-base">
            for every occasion, we transform {<br/>}your wishes into curated lists.
          </p>
          <GhostButtonWhite text={"MEET MYSOUE"} />
        </div>
      </div>
    </div>
  );
}
