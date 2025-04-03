"use client";

import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";
// 1) Import next-intl's useTranslations
import { useTranslations } from "next-intl";

interface HeroBanner3Props {
  backgroundImage: string; // Background image URL
  headingText: string;     // Main heading text (still a prop if you want dynamic)
  italicText: string;      // Italicized part of the heading (still a prop)
  textColor?: string;      // New optional text color prop
}

const HeroBanner3: React.FC<HeroBanner3Props> = ({
  backgroundImage,
  headingText,
  italicText,
  textColor 
}) => {
  // 2) Create a translator for the "HeroBanner3" namespace
  const t = useTranslations("HeroBanner3");

  return (
    <div className="relative text-white mx-2 sm:mx-10 rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div
        className="relative w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Navigation Bar */}
      <nav className="hidden sm:flex absolute top-0 left-0 w-full z-50 items-center justify-between px-4 md:px-8 py-6 bg-[#A5282C]">
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
        </div>

        <Link href="/" className="text-2xl font-serif text-white">
          {t("mysoue")}
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <button className="hover:opacity-80" aria-label={t("search")}>
            🔍
          </button>
          <Link href="/login" className="text-sm hover:opacity-80">
            {t("account")}
          </Link>
          <LocaleSwitcher />
        </div>
      </nav>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className={`text-4xl font-serif tracking-wide text-center ${textColor}`}>
          {headingText} <span className="italic">{italicText}</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroBanner3;