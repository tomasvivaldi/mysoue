import React from "react";

import Footer2 from "@/components/Footer2";
import Navbar3 from "@/components/Navbar3";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

// const layout = ({ children }: { children: React.ReactNode }) => {

interface LayoutProps {
  children: React.ReactNode;
  // session: any;
  locale: string;
}

const layout: React.FC<LayoutProps> = async ({
  children,
  // session,
}) => {
  const locale = getLocale();

  return (
    <div className="flex flex-col bg-[#fbf9f4] font-nunito">
      <Navbar3 locale={locale} />
      {children}
      <Footer2 />
    </div>
  );
};

export default layout;
