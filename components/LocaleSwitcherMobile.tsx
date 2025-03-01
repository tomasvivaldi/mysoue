"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      const segments = pathname.split("/");
      // Replace the locale segment (segments[1]) with the new locale
      segments[1] = nextLocale;
      const newPathname = segments.join("/");
      router.replace(newPathname);
    });
  }

  return (
    <div className="flex justify-start sm:justify-center items-center ">
      <button
        disabled={isPending}
        onClick={() => switchLocale("en")}
        className={`
          pr-2  py-1 text-sm transition-colors
          ${
            localeActive === "en"
              ? "text-gray-400 pointer-events-none"
              : "text-black hover:text-gray-600"
          }
        `}
      >
        EN
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 -mx-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 20.247 6-16.5" />
      </svg>

      <button
        disabled={isPending}
        onClick={() => switchLocale("th")}
        className={`
          px-2 py-1 text-sm transition-colors
          ${
            localeActive === "th"
              ? "text-gray-400 pointer-events-none"
              : "text-black hover:text-gray-600"
          }
        `}
      >
        TH
      </button>
    </div>
  );
}