import React from "react";
import Navbar3 from "@/components/Navbar3";
import { getLocale } from "next-intl/server";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  return (
    <div className="x-paddings w-full">
      {children}
    </div>
  );
};

export default layout;
