import React from "react";
import { useTranslations } from "next-intl";

interface AddToWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWishlist: () => void;
  onBrowseWishlists: () => void;
}

const AddToWishlistModal: React.FC<AddToWishlistModalProps> = ({
  isOpen,
  onClose,
  onCreateWishlist,
  onBrowseWishlists,
}) => {
  const t = useTranslations("AddToWishlistModal");

  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] min-w-fit sm:w-[70%] lg:w-[40%] bg-[#A5282C] rounded-lg shadow-lg p-8 h-1/2 flex flex-col justify-center">
        {/* Modal Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          {t("add_to_wishlist")}
        </h2>

        {/* Modal Content */}
        <p className="text-white text-center mb-8">
          {t("how_would_you_like_to_add_the_product_to_your_wishlist")}
        </p>

        {/* Modal Buttons */}
        <div className="flex justify-center flex-col gap-4">
          {/* Add Product to Wishlist Button */}
          <button
            onClick={onCreateWishlist}
            className=" whitespace-nowrap bg-[#FDF4E5] text-[#A5282C] py-2 px-8 rounded-full font-medium hover:bg-[#F5E7D6] transition text-center"
          >
            {t("add_product_to_wishlist")}
          </button>

          <button
            onClick={onClose}
            className=" text-white hover:text-gray-300 text-lg"
          >
            {t("go_back")}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AddToWishlistModal;