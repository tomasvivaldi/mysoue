'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export default function VideoBanner() {
  return (
    <div className="relative text-white min-h-[600px] mx-2 sm:mx-10 rounded-3xl ">
      {/* Background Video */}
      <video
        className="absolute inset-0 object-cover w-full h-full rounded-3xl"
        src="/videos/mysoue-banner.mp4"
        autoPlay
        loop
        muted
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-6">
        <div className="sm:flex gap-3 md:gap-8 hidden">
          <Link href="/about" className="text-sm hover:opacity-80">
            ABOUT
          </Link>
          <Link href="/lists" className="text-sm hover:opacity-80">
            LISTS
          </Link>
          <Link href="/explore" className="text-sm hover:opacity-80">
            EXPLORE
          </Link>
          <Link href="/blog" className="text-sm hover:opacity-80">
            BLOG
          </Link>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-serif">Mysoue</h1>
        </Link>

        <div className="sm:flex gap-3 md:gap-8 hidden items-center">
          <button className="hover:opacity-80">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/login" className="text-sm hover:opacity-80">
            ACCOUNT
          </Link>
          <div className="text-sm">
            <button className="hover:opacity-80">EN</button>
            {" / "}
            <button className="hover:opacity-80">TH</button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className=" z-10 absolute bottom-[5%] sm:bottom-[15%] left-8  space-y-4">
        <div className="">
          <h2 className="text-5xl font-light tracking-wide">GIFTING</h2>
          <p className="text-5xl font-serif italic">made authentic</p>
        </div>
        <Link 
          href="/wishlist" 
          className="block text-xl font-serif italic hover:opacity-80 ml-8"
        >
          create my wishlist
        </Link>
      </div>
    </div>
  )
}


