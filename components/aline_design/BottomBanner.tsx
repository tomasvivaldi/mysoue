'use client';

import Image from 'next/image';

export default function BottomBanner() {
  return (
    <div className="relative w-full bg-[#FAF7F3] -mb-10 ">
      {/* Background Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/About/banner.jpg" // Replace with your image path
          alt="Choosing a gift background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-center z-10 px-6 mx-24">
        <div className=''>
            <h2 className="text-white text-2xl md:text-4xl font-semibold leading-tight tracking-wide">
            CHOOSING A GIFT
            </h2>
            <p className="text-white text-lg md:text-2xl italic mt-2">
            doesn’t have to be hard
            </p>
        </div>
        <button className="mt-4 px-6 py-2 bg-[#FFF9E8] text-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all">
          start now
        </button>
      </div>

      
    </div>
  );
}
