import React from "react";

import Footer2 from "@/components/Footer2";
import Navbar3 from "@/components/Navbar3";
import { getLocale } from "next-intl/server";

const layout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  return (
    <div className="flex flex-col bg-white">
      <Navbar3 locale={locale} />
      {children}
      <Footer2 />
    </div>
  );
};

export default layout;
