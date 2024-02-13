"use client";
import Link from "next/link";

import { JSX, SVGProps, useState } from "react";
import { signOut } from "next-auth/react";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { text: "My wishlists", href: "/dashboard/my-wishlists" },
    // { text: 'How It Works', href: '/how-it-works' },
    { text: "Create new wishlist", href: "/dashboard/create-new-wishlist" },
    { text: "Shared wishlists", href: "/dashboard/shared-wishlists" },
    { text: "Our lists", href: "/dashboard/our-wishlists" },
    // Additional menu items...
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 bg-[#A67B5B] text-white px-4 py-2 transition-shadow duration-300 ${
          isSidebarOpen ? "shadow-none" : "shadow-md"
        }`}
      >
        <div className=" flex flex-row items-center justify-between ">
          <div className={`flex items-center  ${isSidebarOpen ? "" : ""}`}>
            {/* Hamburger button for mobile */}
            <button
              className={`mr-4 p-0.5 active:bg-slate-200/20  rounded-lg ${
                isSidebarOpen ? "bg-slate-100/20 " : "text-white"
              }`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
              <h1 className="text-xl sm:text-2xl font-light block">MYSOUE</h1>
            </a>
            {isSidebarOpen && (
              <div
                className="fixed md:my-12 left-0 inset-y-0 -z-50 flex items-left justify-start
              w-full md:w-1/4 lg:w-1/6 "
              >
                {/* Backdrop */}
                <div
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden absolute inset-0 bg-black opacity-50"
                ></div>

                {/* Modal content */}
                <div
                  className="bg-[#A67B5B]
                  overflow-y-auto z-50 flex flex-col justify-between h-screen"
                >
                  <ul className="flex flex-col h-screen pt-12 md:pt-0">
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className="body-text !font-bold border-l border-r border-[#A67B5B]"
                      >
                        <a
                          className="text-white font-medium block py-2 pl-5 pr-12 hover:bg-white hover:text-[#A67B5B]
                           whitespace-nowrap"
                          href={item.href}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col">
                    <Link
                      className="md:hidden flex flex-row
                    justify-between group mb-3 md:mb-28 text-white font-medium  py-2 pl-5 pr-12 hover:bg-white hover:text-[#A67B5B] cursor-pointer"
                      href="/"
                    >
                      <p className="text-sm font-medium group-hover:underline ">
                        Back to website
                      </p>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mb-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg> */}
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex flex-row justify-between group mb-3 md:mb-28 text-white font-medium  py-2 pl-5 pr-12 hover:bg-white hover:text-[#A67B5B] cursor-pointer"
                    >
                      <p className="text-sm font-medium group-hover:underline ">
                        Sign Out
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mb-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`flex items-center space-x-8 justify-center  ${
              isSidebarOpen ? "block" : "hidden"
            } md:block`}
          ></div>
          <div className="flex items-center space-x-4 ">
            {/* <SearchIcon className="h-5 w-5" />
        <Link className="text-sm font-medium " href="#">
          Search
        </Link> */}
            <div className="hidden md:flex md:flex-row gap-2 items-center">
              <Link className="text-sm font-medium hover:underline " href="/">
                Back to website
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mb-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

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

export default Navbar;
