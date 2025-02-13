"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "../LocaleSwitcher";

interface VideoBannerProps {
  locale: Promise<string>;
}

const VideoBanner: React.FC<VideoBannerProps> = ({ locale }) => {
  const [currentLocale, setCurrentLocale] = useState<string | null>(null);

  // Resolve the promised locale
  useEffect(() => {
    async function resolveLocale() {
      const resolvedLocale = await locale;
      setCurrentLocale(resolvedLocale);
      console.log("[VideoBanner] Current locale:", resolvedLocale);
    }
    resolveLocale();
  }, [locale]);

  // For locale switching
  const pathname = usePathname();

  // Use next-intl translations
  const tNavbar = useTranslations("Navbar");
  const tHero = useTranslations("Hero");

  return (
    <div className="relative text-white min-h-[600px] mx-2 sm:mx-10 rounded-3xl">
      {/* Background Video */}
      <video
        className="absolute inset-0 object-cover w-full h-full rounded-3xl"
        src="/videos/mysoue-banner.mp4"
        autoPlay
        loop
        muted
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-6">
        <div className="sm:flex gap-3 md:gap-8 hidden">
          <Link href={`/${currentLocale}/about`} className="text-sm hover:opacity-80">
            {tNavbar("about")}
          </Link>
          <Link href={`/${currentLocale}/lists`} className="text-sm hover:opacity-80">
            {tNavbar("lists")}
          </Link>
          <Link href={`/${currentLocale}/explore`} className="text-sm hover:opacity-80">
            {tNavbar("explore") || "Explore"}
          </Link>
          <Link href={`/${currentLocale}/blog`} className="text-sm hover:opacity-80">
            {tNavbar("blog") || "Blog"}
          </Link>
        </div>

        <Link
          href={`/${currentLocale || "en"}`}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <h1 className="text-2xl font-serif">{tNavbar("title")}</h1>
        </Link>

        <div className="sm:flex gap-3 md:gap-8 hidden items-center">
          <button className="hover:opacity-80">
            <Search className="w-5 h-5" />
          </button>
          <Link href={`/${currentLocale}/login`} className="text-sm hover:opacity-80">
            {tNavbar("login")}
          </Link>

          {/* Language Switcher */}
          <LocaleSwitcher/>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="z-10 absolute bottom-[5%] sm:bottom-[15%] left-8 space-y-4">
        <div>
          <h2 className="text-5xl font-light tracking-wide">
            {tHero("gifting")}
          </h2>
          <p className="text-5xl font-serif italic">
            {tHero("madeAuthentic")}
          </p>
        </div>
        <Link
          href={`/${currentLocale}/wishlist`}
          className="block text-xl font-serif italic hover:opacity-80 w-fit px-8 py-1 rounded-full hover:bg-white hover:text-black"
        >
          {tHero("wishlistCTA") || "create my wishlist"}
        </Link>
      </div>
    </div>
  );
};

export default VideoBanner;