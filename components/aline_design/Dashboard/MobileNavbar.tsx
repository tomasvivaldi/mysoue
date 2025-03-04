"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import LocaleSwitcherMobile from "@/components/LocaleSwitcherMobile";

interface DashboardMobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  isActive: (path: string) => boolean;
}

const DashboardMobileNavbar: React.FC<DashboardMobileNavbarProps> = ({
  isOpen,
  onClose,
  isActive,
}) => {
  // 1) Access "DashboardMobileNavbar" translations
  const t = useTranslations("DashboardMobileNavbar");

  return (
    <>
      {/* Background overlay (only visible when navbar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 h-screen w-[300px] xs:w-[350px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Close Button - Not Localized, "✕" remains */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl"
        >
          ✕
        </button>

        {/* Sidebar Content */}
        <div className="pt-16 px-6">
          {/* Navbar Links */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">{t("navigation")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:opacity-80"
                  onClick={onClose}
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/lists"
                  className="text-sm hover:opacity-80"
                  onClick={onClose}
                >
                  {t("lists")}
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-sm hover:opacity-80"
                  onClick={onClose}
                >
                  {t("explore")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Sidebar Links */}
          <div>
            <h3 className="text-xl font-bold mb-2">{t("dashboard")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/dashboard/account-overview"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-2 rounded-lg ${
                    isActive("/dashboard/account-overview")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">
                    {t("accountOverview")}
                  </span>
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
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-2 rounded-lg ${
                    isActive("/dashboard/my-wishlists")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">
                    {t("myWishlists")}
                  </span>
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
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-2 rounded-lg ${
                    isActive("/dashboard/my-gifts")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">{t("myGifts")}</span>
                  {isActive("/dashboard/my-gifts") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>

              {/* New Shared Wishlists Link */}
              <li>
                <Link
                  href="/dashboard/shared-wishlists"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-2 rounded-lg ${
                    isActive("/dashboard/shared-wishlists")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">
                    {t("sharedWishlists")}
                  </span>
                  {isActive("/dashboard/shared-wishlists") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>

              {/* ///// */}
              <li>
                <Link
                  href="/dashboard/mysoue-lists"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-2 rounded-lg ${
                    isActive("/dashboard/mysoue-lists")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">
                    {t("mysoueLists")}
                  </span>
                  {isActive("/dashboard/mysoue-lists") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>
               {/* ///// */}
               <li>
                <Link
                  href="/dashboard/explore"
                  className={`flex items-center justify-between border-b border-[#C6B8A2] py-2 rounded-lg ${
                    isActive("/dashboard/explore")
                      ? "font-bold"
                      : "hover:bg-[#f2f2f2] transition"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm md:text-lg">
                    {t("dashboardExplore")}
                  </span>
                  {isActive("/dashboard/explore") ? (
                    <div className="w-5 h-5 bg-[#C6B8A2] rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 border border-[#C6B8A2] rounded-full"></div>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-start my-4">
            <LocaleSwitcherMobile />
          </div>
          {/* Footer */}
          <div className="mt-8">
            <p className="text-sm text-[#C6B8A2] mb-2">
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
  );
};

export default DashboardMobileNavbar;