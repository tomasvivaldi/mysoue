'use client'

import Image from 'next/image'

export default function Founders() {
  const founders = [
    {
      name: 'LUIZA',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/path/to/luiza.jpg', // Replace with actual image path
    },
    {
      name: 'CHARLOTTE',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/path/to/charlotte.jpg', // Replace with actual image path
    },
  ]

  return (
    <div className="bg-white py-8 md:py-12">
      <h2 className="text-center text-xl md:text-2xl font-serif text-neutral-800 mb-6 md:mb-8">
        meet our founders
      </h2>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-8 lg:px-24 pb-8 sm:pb-10">
        {/* Background shape element */}
        <div className="absolute bg-[#FEFAF4] bottom-0 h-full md:h-1/2 w-full rounded-3xl" />
        {founders.map((founder, index) => (
          <div key={index} className="z-10 text-left mx-4 my-2">
            <div className="relative w-full aspect-[3/4] mx-auto rounded-lg bg-[#C6B8A2] h-[300px] md:h-[420px]">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mx-4 mt-4">
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900">
                {founder.name}
              </h3>
              <p className="text-xs md:text-sm text-neutral-700 mt-2">
                {founder.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}