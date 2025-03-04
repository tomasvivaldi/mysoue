import React from "react";
import { getLocale } from "next-intl/server";

const layout = ({ children }: { children: React.ReactNode }) => {
  const locale = getLocale();
  return (
    <div className="px-4 w-full">
      {children}
    </div>
  );
};

export default layout;
