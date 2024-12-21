'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner2() {
  return (
    <div className="relative text-white mx-10 rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/About/hero.jpg" // Replace with your image path
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
      </div>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-8 py-6 bg-[#A5282C]">
        <div className="flex gap-8">
          <Link href="/about" className="text-sm hover:opacity-80">
            ABOUT
          </Link>
          <Link href="/lists" className="text-sm hover:opacity-80">
            LISTS
          </Link>
          <Link href="/explore" className="text-sm hover:opacity-80">
            EXPLORE
          </Link>
        </div>

        <Link href="/" className="text-2xl font-serif text-white">
          Mysoue
        </Link>

        <div className="flex items-center gap-8">
          <button className="hover:opacity-80">
            <span className="sr-only">Search</span>
            🔍
          </button>
          <Link href="/account" className="text-sm hover:opacity-80">
            ACCOUNT
          </Link>
          <div className="text-sm">
            <button className="hover:opacity-80">EN</button>
            {' / '}
            <button className="hover:opacity-80">TH</button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="absolute bottom-[10%] left-10 z-10">
        <h1 className="text-4xl font-serif tracking-wide">
          WISHLISTS ACCESSIBLE <br /> TO <span className="italic">everyone</span>
        </h1>
        <Link
          href="/start"
          className="inline-block mt-6 px-8 py-3 text-lg font-serif italic bg-white text-[#800000] rounded-full shadow-md hover:shadow-lg transition-all"
        >
          start now
        </Link>
      </div>
    </div>
  );
}
