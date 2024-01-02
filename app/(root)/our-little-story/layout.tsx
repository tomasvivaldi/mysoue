import React from "react";

import Footer from "@/components/Footer";
import Navbar2 from "@/components/Navbar2";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar2 />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
