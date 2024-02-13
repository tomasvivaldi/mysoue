"use client";

import React, { useState } from "react";

import Footer from "@/components/dashboard/Footer";
import Navbar from "@/components/dashboard/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`flex flex-1 mt-12 z-0 pb-36 md:pb-12 ${
          isSidebarOpen ? "md:ml-[250px]" : "md:ml-0"
        } transition-margin duration-300`}
      >
        {children}
      </div>
      <div className="z-30 md:z-40">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
