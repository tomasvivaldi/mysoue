import React from "react";
import Footer2 from "@/components/Footer2";
import Navbar3 from "@/components/Navbar3";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar3 />
      {children}
      <Footer2 />
    </div>
  );
};

export default layout;
