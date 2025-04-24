import React from "react";

import Footer2 from "@/components/Footer2";
import Navbar3 from "@/components/Navbar3";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from "next-intl";

const layout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  const t = useTranslations("MobileNav");

  return (
    <div className="flex flex-col bg-white">
      {/* <Navbar3 locale={locale} /> */}
      <nav className="sm:fixed top-0 left-0 w-full z-50 bg-[#A5282C] text-white rounded-b-3xl">
      {/* Hidden checkbox to toggle mobile menu */}
      <input type="checkbox" id="menu-toggle" className="hidden peer" />

      <div className="flex items-center justify-between px-8 py-2 sm:py-6">
        {/* Mobile: Hamburger button */}
        <label htmlFor="menu-toggle" className="sm:hidden cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        {/* Desktop: Left nav links */}
        <div className="hidden sm:flex gap-8">
          {/* <Link href="/about" className="text-sm hover:opacity-80">
            {t("about")}
          </Link>
          <Link href="/lists" className="text-sm hover:opacity-80">
            {t("lists")}
          </Link>
          <Link href="/explore" className="text-sm hover:opacity-80">
            {t("explore")}
          </Link>
          <Link href="/blog" className="text-sm hover:opacity-80">
            {t("blog")}
          </Link> */}
          <p>Shared List</p>
        </div>

        {/* Center brand */}
        <Link href="/" className="text-2xl   text-white">
          {t("brand")}
        </Link>

        {/* Desktop: Right nav links */}
        <div className="hidden sm:flex items-center gap-8">
          {/* <Link href="/login" className="text-sm hover:opacity-80">
            {t("account")}
          </Link> */}
          <LocaleSwitcher />
        </div>
      </div>

      {/* Mobile Menu Dropdown (toggled via the checkbox "peer") */}
      <div className="peer-checked:block hidden sm:hidden px-4 pb-4">
        <div className="flex flex-col gap-4 my-4">
          <Link href="/about" className="text-sm hover:opacity-80 block">
            {t("about")}
          </Link>
          <Link href="/lists" className="text-sm hover:opacity-80 block">
            {t("lists")}
          </Link>
          <Link href="/explore" className="text-sm hover:opacity-80 block">
            {t("explore")}
          </Link>
          <Link href="/blog" className="text-sm hover:opacity-80 block">
            {t("blog")}
          </Link>
          <Link href="/login" className="text-sm hover:opacity-80 block">
            {t("account")}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </nav>

      <div className=" w-full h-[40px] sm:h-[80px]"/>
      
      {children}
      <div className="z-10"><Footer2 /></div>
    </div>
  );
};

export default layout;
