"use client";

import Link from "next/link";
import Image from "next/image";
import LocaleSwitcher from "../LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function HeroBanner2() {
  // 1) Create a translator for the "HeroBanner2" namespace
  const t = useTranslations("HeroBanner2");

  return (
    <div className="relative text-white mx-2 sm:mx-10 rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/About/hero.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
      </div>

      {/* Navigation Bar */}
      <nav className="hidden sm:flex absolute top-0 left-0 w-full z-10 items-center justify-between px-4 md:px-8 py-6 bg-[#A5282C]">
        <div className="flex gap-3 md:gap-8">
          <Link href="/about" className="text-sm hover:opacity-80">
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
          </Link>
          <Link href="/faq" className="text-sm hover:opacity-80">
            {t("faqs")}
          </Link>
        </div>

        <Link href="/" className="text-2xl   text-white">
          {t("mysoue")}
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <button className="hover:opacity-80">
            <span className="sr-only">{t("search")}</span>
            🔍
          </button>
          <Link href="/login" className="text-sm hover:opacity-80">
            {t("account")}
          </Link>
          <LocaleSwitcher />
        </div>
      </nav>

      {/* Hero Content */}
      <div className="absolute bottom-[10%] left-10 z-10">
        {/* Use interpolation for the hero heading:
            heroHeading: "WISHLISTS ACCESSIBLE \n TO {emphasis}" */}
        <h1 className="text-4xl   tracking-wide whitespace-pre-line text-shadow">
          {t.rich("heroHeading", {
            emphasis: () => <span className="italic"></span>
          })}
          <span>{t("heroHeadingSpan")}</span>
        </h1>

        <Link
          href="/login"
          className="inline-block mt-6 px-8 py-3 text-lg   italic bg-white text-[#800000] rounded-full shadow-md hover:shadow-lg hover:text-primary active:bg-transparent active:text-white active:border-2 active:bg-primary transition-all"
        >
          {t("startNow")}
        </Link>
      </div>
    </div>
  );
}