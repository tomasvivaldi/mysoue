"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import SolidButton1 from "../buttons/SolidButton1";

const ProductBanner: React.FC = () => {
  const t = useTranslations("Explore-ProductPage");

  return (
    <div className="relative w-full bg-[#FAF7F3] py-16 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("createWishlistBannerTitle")}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t("createWishlistBannerDescription")}
            </p>
            <Link href="/login">
              <SolidButton1 
                text={t("createWishlistButton")} 
                className="bg-[#A5282C] text-white hover:text-white hover:border-primary hover:bg-[#8A1F22]"
              />
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-80">
            <Image
              src="/Explore/bg.jpg"
              alt="Gift giving illustration"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner; 