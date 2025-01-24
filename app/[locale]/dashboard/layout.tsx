"use client";

import React, { useState } from "react";
import Footer from "@/components/dashboard/Footer";
import Navbar from "@/components/dashboard/Navbar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathname = usePathname(); // Get the current pathname

  // Helper function to normalize path by removing locale
  const normalizePath = (path: string) => {
    return path.replace(/^\/(en|th)\//, "/"); // Removes "/en/" or "/th/"
  };

  // Helper function to check if the link is active
  const isActive = (path: string) => normalizePath(pathname).startsWith(path);

  return (
    <div className="flex flex-col h-screen">
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
            {" / "}
            <button className="hover:opacity-80">TH</button>
          </div>
        </div>
      </nav>

      <div
        className={`flex flex-1 z-0 pb-36 md:pb-12 pt-[30px] ${
          isSidebarOpen ? "md:ml-[450px]" : "md:ml-0"
        } transition-margin duration-300`}
      >
<div className="fixed pt-[70px] pl-[50px] left-0 inset-y-0 w-full md:w-1/3 bg-white flex flex-col h-screen shadow-lg">
  {/* Sidebar Menu */}
  <ul className="flex flex-col gap-6 px-6 py-8">
    {/* Account Overview */}
    <li>
      <Link
        href="/dashboard/account-overview"
        className={`flex items-center justify-between border-b border-t border-[#C6B8A2] py-4 rounded-lg ${
          isActive("/dashboard/account-overview") ? "font-bold" : "hover:bg-[#f2f2f2] transition"
        }`}
      >
        <span className="text-lg">ACCOUNT OVERVIEW</span>
        {isActive("/dashboard/account-overview") ? (
          <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
        ) : (
          <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
        )}
      </Link>
    </li>

    {/* My Wishlists */}
    <li>
      <Link
        href="/dashboard/my-wishlists"
        className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
          isActive("/dashboard/my-wishlists") ? "font-bold" : "hover:bg-[#f2f2f2] transition"
        }`}
      >
        <span className="text-lg">MY WISHLISTS</span>
        {isActive("/dashboard/my-wishlists") ? (
          <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
        ) : (
          <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
        )}
      </Link>
    </li>

    {/* My Gifts */}
    <li>
      <Link
        href="/dashboard/my-gifts"
        className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
          isActive("/dashboard/my-gifts") ? "font-bold" : "hover:bg-[#f2f2f2] transition"
        }`}
      >
        <span className="text-lg">MY GIFTS</span>
        {isActive("/dashboard/my-gifts") ? (
          <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
        ) : (
          <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
        )}
      </Link>
    </li>
  </ul>

  {/* Footer Section */}
  <div className="flex flex-col items-left px-6">
    <p className="text-sm text-[#C6B8A2] mb-4">
      NEED HELP? <span className="font-medium">CONTACT US.</span>
    </p>
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full bg-transparent border border-[#C6B8A2] rounded-full py-2 text-[#A67B5B] font-bold hover:bg-[#C6B8A2]/20 transition"
    >
      LOG OUT
    </button>
  </div>
</div>

        {children}
      </div>

      <div className="z-10 md:z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;