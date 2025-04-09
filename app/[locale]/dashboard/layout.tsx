"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/dashboard/Footer";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import MobileNavbar from "@/components/aline_design/Dashboard/MobileNavbar";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track screen size

  const pathname = usePathname(); // Get the current pathname

  // Helper function to normalize path by removing locale
  const normalizePath = (path: string) => {
    return path.replace(/^\/(en|th)\//, "/"); // Removes "/en/" or "/th/"
  };

  // Helper function to check if the link is active
  const isActive = (path: string) => normalizePath(pathname).startsWith(path);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set to true for screens < md
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen for changes

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const t = useTranslations("DashboardMobileNavbar");
  return (
    <div className="flex flex-col h-screen">
      {/* Show Mobile Navbar for Small Screens */}
      {isMobile ? (
        <>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-[90px] left-2 md:hidden bg-[#A5282C] text-white rounded-full p-2 shadow-lg z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <MobileNavbar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isActive={isActive}
          />
        </>
      ) : (
        // Show Desktop Navbar + Sidebar for Medium and Larger Screens
        <>
          {/* Navbar */}
          <nav className="fixed top-0 left-0 w-full h-[80px] z-50 flex items-center justify-between px-8 py-6 bg-[#A5282C] text-white rounded-b-3xl">
            <div className="flex gap-3 md:gap-8">
              <Link href="/about" className="text-sm hover:opacity-80">
                {t("about")}
              </Link>
              <Link href="/lists" className="text-sm hover:opacity-80">
                {t("lists")}
              </Link>
              <Link href="/blog" className="text-sm hover:opacity-80">
                {t("blog")}
              </Link>
            </div>

            <Link href="/" className="text-2xl font-serif text-white">
              Mysoue
            </Link>

            <div className="flex items-center gap-3 md:gap-8">
              <button className="hover:opacity-80">
                <span className="sr-only">Search</span> 🔍
              </button>
              <Link href="/login" className="text-sm hover:opacity-80">
                {t("account")}
              </Link>
              <LocaleSwitcher />
            </div>
          </nav>
          <div className="flex z-0 transition-all duration-300 mt-[80px]">
            {/* Sidebar */}
            <div className="fixed pt-[70px] xl:pl-[50px] left-0 inset-y-0 bg-white flex flex-col h-screen shadow-lg w-[250px] md:w-1/3">
              <ul className="flex flex-col gap-6 px-6 py-8">
                <li>
                  <Link
                    href="/dashboard/account-overview"
                    className={`flex items-center justify-between border-b border-t border-[#C6B8A2] py-4 rounded-lg ${
                      isActive("/dashboard/account-overview")
                        ? "font-bold"
                        : "hover:bg-[#f2f2f2] transition"
                    }`}
                  >
                    <span className="text-lg">{t("accountOverview")}</span>
                    {isActive("/dashboard/account-overview") ? (
                      <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                    ) : (
                      <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/my-wishlists"
                    className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
                      isActive("/dashboard/my-wishlists")
                        ? "font-bold"
                        : "hover:bg-[#f2f2f2] transition"
                    }`}
                  >
                    <span className="text-lg">{t("myWishlists")}</span>
                    {isActive("/dashboard/my-wishlists") ? (
                      <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                    ) : (
                      <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/my-gifts"
                    className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
                      isActive("/dashboard/my-gifts")
                        ? "font-bold"
                        : "hover:bg-[#f2f2f2] transition"
                    }`}
                  >
                    <span className="text-lg">{t("myGifts")}</span>
                    {isActive("/dashboard/my-gifts") ? (
                      <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                    ) : (
                      <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                    )}
                  </Link>
                </li>

                {/* New Shared Wishlists Link */}
                {/* <li>
                  <Link
                    href="/dashboard/shared-wishlists"
                    className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
                      isActive("/dashboard/shared-wishlists")
                        ? "font-bold"
                        : "hover:bg-[#f2f2f2] transition"
                    }`}
                  >
                    <span className="text-lg">{t("sharedWishlists")}</span>
                    {isActive("/dashboard/shared-wishlists") ? (
                      <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                    ) : (
                      <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                    )}
                  </Link>
                </li> */}
                {/* New My Soue Wishlists Link */}
                <li>
                  <Link
                    href="/dashboard/mysoue-lists"
                    className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
                      isActive("/dashboard/mysoue-lists")
                        ? "font-bold"
                        : "hover:bg-[#f2f2f2] transition"
                    }`}
                  >
                    <span className="text-lg">{t("mysoueLists")}</span>
                    {isActive("/dashboard/mysoue-lists") ? (
                      <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                    ) : (
                      <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                    )}
                  </Link>
                </li>
                {/* New Explore Wishlists Link */}
                <li>
                  <Link
                    href="/dashboard/explore"
                    className={`flex items-center justify-between border-b border-[#C6B8A2] pb-4 rounded-lg ${
                      isActive("/dashboard/explore")
                        ? "font-bold"
                        : "hover:bg-[#f2f2f2] transition"
                    }`}
                  >
                    <span className="text-lg">{t("dashboardExplore")}</span>
                    {isActive("/dashboard/explore") ? (
                      <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                    ) : (
                      <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                    )}
                  </Link>
                </li>
              </ul>

              {/* Footer Section */}
              <div className="flex flex-col items-left px-6">
                <p className="text-sm text-[#C6B8A2] mb-4">
                  {t("needHelpContactUs")}
                </p>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full bg-transparent border border-[#C6B8A2] rounded-full py-2 text-[#A67B5B] font-bold hover:bg-[#C6B8A2]/20 transition"
                >
                  {t("logOut")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className={`flex-1 ml-0 md:ml-[33%]`}>{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;