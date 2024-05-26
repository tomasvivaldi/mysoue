"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname(); // Get the current pathname

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = nextLocale; // Replace the current locale with the new one
      const newPathname = segments.join("/");
      router.replace(newPathname); // Replace the current path with the new one
    });
  };

  return (
    <div className="inline-block relative w-fit">
      <select
        defaultValue={localeActive}
        onChange={onSelectChange}
        disabled={isPending}
        className="block appearance-none w-fit bg-white border border-gray-400 hover:border-gray-500 pl-2 pr-4 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-xs text-black"
      >
        <option value="en" className="flag-icon ">
          English &#127468;&#127463;
        </option>
        <option value="th" className="flag-icon ">
          Thai &#127481;&#127469;
        </option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
        <svg
          className="fill-current h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 7l5 5 5-5z" />
        </svg>
      </div>
    </div>
  );
}
