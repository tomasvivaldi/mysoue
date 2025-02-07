import Image from "next/image";
import GhostButtonWhite from "../GhostButtonWhite";

export default function MidBanner() {
  return (
    <div className="relative mx-4 sm:mx-12 rounded-3xl h-[400px] sm:h-[600px] overflow-hidden my-10 sm:my-20">
      {/* Background Image */}
      <Image
        src="/MidBanner/bg.jpg"
        alt="Person smiling at phone in red sweater"
        width={1200}
        height={600}
        className="object-cover object-top w-full h-full transform scale-100 sm:scale-125"
        priority
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/0" />

      {/* Text Content */}
      <div className="absolute inset-0 flex justify-center sm:justify-end items-center px-4 sm:px-12 lg:px-24">
        <div className="text-shadow max-w-lg space-y-5 text-center translate-x-0 translate-y-0 sm:-translate-x-1/2 sm:-translate-y-6">
          <h1 className="space-y-1">
            <span className="block text-3xl sm:text-4xl lg:text-6xl font-light tracking-wide text-white">
              you want it?
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-6xl font-light tracking-wide text-white">
              we got it.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/90">
            for every occasion, we transform<br />your wishes into curated lists.
          </p>
          <GhostButtonWhite text="MEET MYSOUE" className="text-shadow"/>
        </div>
      </div>
    </div>
  );
}