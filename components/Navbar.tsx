"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute z-50 top-0 w-full border-b border-gray-800 bg-gray-700/40 py-2 sm:py-7 text-gray-900">
      <div className="flex-between mx-auto w-full px-6 xs:px-8 sm:px-16">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:bg-gray-800/40 p-1 rounded-lg block md:hidden cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        <ul className="flex-center gap-x-3 max-md:hidden md:gap-x-10">
          <li className="body-text !font-bold">
            <a
              className="text-slate-100 !font-bold "
              rel="noopener noreferrer"
              href="/"
            >
              Aikido-Dojo Jiyukan Karlsruhe e.V.
            </a>
          </li>
          <li className="body-text !font-semibold text-gray-200 hover:underline">
            <a
              href="/#aboutus"
              className="font-semibold"
              rel="noopener noreferrer"
            >
              Über Uns
            </a>
          </li>
          <li className="body-text !font-semibold text-gray-200">
            {/* <Link href="" target="_blank"> */}
            <a
              href="/was-ist-aikido"
              className="font-semibold hover:underline"
              rel="noopener noreferrer"
            >
              Was Ist Aikido
            </a>

            {/* </Link> */}
          </li>
        </ul>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-left justify-start">
            {/* Backdrop */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black opacity-50"
            ></div>

            {/* Modal content */}
            <div className="bg-gray-700 border-2 border-gray-700 w-3/4 h-screen overflow-y-auto z-10">
              <ul className="flex flex-col py-4 space-y-4">
                <li className="body-text !font-bold">
                  <a
                    className="text-slate-100 !font-bold block py-2 px-5 hover:bg-gray-600"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="body-text !font-semibold text-gray-200 hover:underline">
                  <a
                    className="font-semibold block py-2 px-5 hover:bg-gray-600"
                    href="/#aboutus"
                  >
                    Über Uns
                  </a>
                </li>
                <li className="body-text !font-semibold text-gray-200">
                  <a
                    className="font-semibold block py-2 px-5 hover:bg-gray-600"
                    href="/was-ist-aikido"
                  >
                    Was Ist Aikido
                  </a>
                </li>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-0.5 left-[60%] p-2 rounded-md hover:bg-gray-600 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                {/* ... add more links as required ... */}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
