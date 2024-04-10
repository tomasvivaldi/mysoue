import React from "react";

import Footer from "@/components/Footer";
import Navbar3 from "@/components/Navbar3";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar3 />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
