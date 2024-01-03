"use client";
import React, { useEffect, useState } from "react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to check scroll position
  const handleScroll = () => {
    const offset = window.scrollY;
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    if (offset > vh / 3) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    {
      text: "Our Little Story",
      url: "/our-little-story",
    },
    // { text: "How It Works", url: "/how-it-works" },
    { text: "Create a List", url: "/create-a-list" },
    { text: "Our Lists", url: "/our-lists" },
  ];

  return (
    <nav
      className={`absolute z-50 top-0 w-full py-2 sm:py-4 text-gray-900 transition-colors duration-700 ease-in-out ${
        isScrolled ? "bg-black" : ""
      }`}
    >
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
              className="text-slate-100 !font-light text-xl hover:text-slate-200 "
              rel="noopener noreferrer"
              href="/"
            >
              MYSOUE
            </a>
          </li>
          {menuItems.map((item, index) => (
            <li key={index} className="body-text text-gray-200 hover:underline">
              <a
                href={item.url}
                className=" font-normal"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            </li>
          ))}
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
                {menuItems.map((item, index) => (
                  <li key={index} className="body-text !font-bold">
                    <a
                      className="text-slate-100 !font-bold block py-2 px-5 hover:bg-gray-600"
                      href={item.url}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
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
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
