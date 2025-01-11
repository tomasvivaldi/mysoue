import React from "react";
import Navbar3 from "@/components/Navbar3";
import { getLocale } from "next-intl/server";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  return (
    <div className="flex flex-col">
      {/* <Navbar3 locale={locale} /> */}
      <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-[#A5282C] text-white rounded-b-3xl">
        <div className="flex gap-8 ">
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
      {children}
    </div>
  );
};

export default layout;
