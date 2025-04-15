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
      <div className="sm:hidden w-full h-[40px] sm:h-[80px]"/>
      {children}
    </div>
  );
};

export default layout;
