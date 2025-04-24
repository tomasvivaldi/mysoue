import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  onAddProductClick: () => void;
}

const EmptyWishlistCard: React.FC<Props> = ({ onAddProductClick }) => {
  const t = useTranslations("EmptyWishlist");

  return (
    <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-8 shadow-md text-center w-full max-w-7xl ">
      <Image
        width="200"
        height="200"
        src="/Symbol/Logo-Mysoue-Symbol_2.png"
        alt="Empty Wishlist"
        className=" mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        {t("yourWishlistIsEmpty")}
      </h2>
      <p className="text-gray-600 mb-4">
        {t("addSomeProductsToGetStarted")}
      </p>
      <button
        onClick={onAddProductClick}
        className="bg-[#A5282C] hover:bg-[#C64138] text-white font-medium py-2 px-6 rounded-full transition"
      >
        {t("addProductButton")}
      </button>
    </div>
  );
};

export default EmptyWishlistCard;