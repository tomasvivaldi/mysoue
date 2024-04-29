"use client";
import Link from "next/link";
import { JSX, SVGProps, useEffect, useState } from "react";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to check scroll position
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50); // Set scrolled state based on scroll position
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { text: "Our little story", href: "/our-little-story" },
    // { text: "How It Works", href: "/how-it-works" },
    { text: "Create a list", href: "/create-a-list" },
    { text: "Our lists", href: "/our-lists" },
    // Additional menu items...
  ];

  return (
    <nav
      className={`z-50 sticky top-0 x-paddings flex items-center justify-between py-2 md:py-4  transition-all duration-500 ${
        isScrolled ? "shadow-md bg-[#fbf9f4]" : "bg-transparent"
      }`}
    >
      <div className={`flex items-center  ${isMenuOpen ? "" : "space-x-8"}`}>
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <a href="/">
          <h1 className="text-3xl font-light hidden sm:block">MYSOUE</h1>
        </a>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-left justify-start">
            {/* Backdrop */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black opacity-50"
            ></div>

            {/* Modal content */}
            <div className="bg-[#fbf9f4] border-2 border-white w-3/4 h-screen overflow-y-auto z-10">
              <ul className="flex flex-col py-4 space-y-4">
                <li className="body-text !font-bold">
                  <a
                    className="font-nunito text-black font-medium block py-2 px-5 hover:bg-slate-100"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                {menuItems.map((item, index) => (
                  <li key={index} className="body-text !font-bold">
                    <a
                      className="font-nunito text-black font-medium block py-2 px-5 hover:bg-slate-100"
                      href={item.href}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-0.5 left-[60%] p-2 rounded-md hover:bg-slate-100 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex flex-row items-center gap-16 justify-evenly w-full ${
          isMenuOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <Link className="flex flex-col group" href="/our-little-story">
          <span className="pt-2 border-t-2 border-black h-1 w-[80%] group-hover:w-full transition-all duration-500" />
          <div
            className="font-nunito pl-4 text-base font-light hover:text-gray-700 group-hover:underline
          "
          >
            Our little story
          </div>
        </Link>
        {/* <Link className="flex flex-col group" href="/how-it-works">
          <span className="pt-2 border-t-2 border-black h-1 w-[80%] group-hover:w-full transition-all duration-500" />
          <div className="pl-4 text-base font-light hover:text-gray-700 group-hover:underline">
            How It Works
          </div>
        </Link> */}
        <Link className="flex flex-col group" href="/create-a-list">
          <span className="pt-2 border-t-2 border-black h-1 w-[80%] group-hover:w-full transition-all duration-500" />
          <div className="font-nunito pl-4 text-base font-light hover:text-gray-700 group-hover:underline">
            Create a list
          </div>
        </Link>
        <Link className="flex flex-col group" href="/our-lists">
          <span className="pt-2 border-t-2 border-black h-1 w-[80%] group-hover:w-full transition-all duration-500" />
          <div className="font-nunito pl-4 text-base font-light hover:text-gray-700 group-hover:underline">
            Our lists
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 ">
        {/* <SearchIcon className="h-5 w-5" />
        <Link className="text-base font-light hover:text-gray-700" href="#">
          Search
        </Link> */}
        <UserIcon className="h-5 w-5" />
        <Link
          className="font-nunito text-sm font-medium hover:text-gray-700 hover:underline"
          href="/login"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
