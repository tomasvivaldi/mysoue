import React from "react";
import Navbar3 from "@/components/Navbar3";
import { getLocale } from "next-intl/server";

const layout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  return (
    <div className="flex flex-col">
      <Navbar3 locale={locale} />
      {children}
    </div>
  );
};

export default layout;
