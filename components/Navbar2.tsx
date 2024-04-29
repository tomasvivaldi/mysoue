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
      setIsScrolled(offset > 0); // Set scrolled state based on scroll position
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
    // { text: 'How It Works', href: '/how-it-works' },
    { text: "Create a list", href: "/create-a-list" },
    { text: "Our lists", href: "/our-lists" },
    // Additional menu items...
  ];

  return (
    <nav
      className={`absolute z-50 top-0 w-full px-4 py-3 md:py-6  text-white justify-between border-b  bg-transparent transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className=" flex flex-row items-center justify-between ">
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
            <h1 className="text-2xl font-light hidden sm:block">MYSOUE</h1>
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
                      className="text-black font-medium block py-2 px-5 hover:bg-slate-100"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  {menuItems.map((item, index) => (
                    <li key={index} className="body-text !font-bold">
                      <a
                        className="text-black font-medium block py-2 px-5 hover:bg-slate-100"
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
          className={`flex items-center space-x-8 justify-center text-shadow ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link
            className="text-sm font-medium  hover:underline"
            href="/our-little-story"
          >
            Our little story
          </Link>
          {/* <Link
          className="text-sm font-medium  hover:underline"
          href="/how-it-works"
        >
          How It Works
        </Link> */}
          <Link
            className="text-sm font-medium  hover:underline"
            href="/create-a-list"
          >
            Create a list
          </Link>
          <Link
            className="text-sm font-medium  hover:underline"
            href="/our-lists"
          >
            Our lists
          </Link>
        </div>
        <div className="flex items-center space-x-4 ">
          {/* <SearchIcon className="h-5 w-5" />
        <Link className="text-sm font-medium " href="#">
          Search
        </Link> */}
          <UserIcon className="h-5 w-5" />
          <Link className="text-sm font-medium  hover:underline" href="/login">
            Login
          </Link>
        </div>
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
