import React from "react";
import Footer2 from "@/components/Footer2";
import Navbar3 from "@/components/Navbar3";
import { getLocale } from "next-intl/server";

interface LayoutProps {
  children: React.ReactNode;
  // If you plan to use session later, you can uncomment it and type it appropriately.
  // session: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const locale = getLocale(); // Ensure this is synchronous or handled before rendering.

  return (
    <div className="flex flex-col bg-[#fbf9f4] font-nunito">
      {/* <Navbar3 locale={locale} /> */}
      {children}
      <Footer2 />
    </div>
  );
};

export default Layout;
