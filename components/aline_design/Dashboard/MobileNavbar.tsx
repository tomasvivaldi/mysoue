"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  isActive: (path: string) => boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ isOpen, onClose, isActive }) => {
  return (
    <>
      {/* Background overlay (only visible when navbar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose} // Clicking outside closes the navbar
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 h-screen w-[300px] xs:w-[350px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-black text-2xl">
          ✕
        </button>

        {/* Sidebar Content */}
        <div className="pt-16 px-6">
          {/* Navbar Links */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">NAVIGATION</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/about" className="text-sm hover:opacity-80" onClick={onClose}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/lists" className="text-sm hover:opacity-80" onClick={onClose}>
                  LISTS
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm hover:opacity-80" onClick={onClose}>
                  EXPLORE
                </Link>
              </li>
            </ul>
          </div>

          {/* Sidebar Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">DASHBOARD</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/dashboard/account-overview"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-4 rounded-lg ${
                    isActive("/dashboard/account-overview")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">ACCOUNT OVERVIEW</span>
                  {isActive("/dashboard/account-overview") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/my-wishlists"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-4 rounded-lg ${
                    isActive("/dashboard/my-wishlists")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">MY WISHLISTS</span>
                  {isActive("/dashboard/my-wishlists") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/my-gifts"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-4 rounded-lg ${
                    isActive("/dashboard/my-gifts")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">MY GIFTS</span>
                  {isActive("/dashboard/my-gifts") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-8">
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
      </div>
    </>
  );
};

export default MobileNavbar;