import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const EmptyGiftsCard: React.FC = () => {
  const t = useTranslations("Dashboard-MyGifts");

  return (
    <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-8 shadow-md text-center w-full max-w-7xl">
      <Image
        width="200"
        height="200"
        src="/Symbol/Logo-Mysoue-Symbol_2.png"
        alt="No Gifts"
        className="mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        {t("noWishlistsFound")}
      </h2>
      <p className="text-gray-600 mb-4">
        {t("createWishlistToStart")}
      </p>
      <Link
        href="/dashboard/create-new-wishlist"
        className="bg-[#A5282C] hover:bg-[#C64138] text-white font-medium py-2 px-6 rounded-full transition"
      >
        {t("createWishlist")}
      </Link>
    </div>
  );
};

export default EmptyGiftsCard;