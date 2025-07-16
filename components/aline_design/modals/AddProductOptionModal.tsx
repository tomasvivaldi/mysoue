import React from "react";
import { useTranslations } from "next-intl";

interface AddProductOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddManually: () => void;
  onBrowseProducts: () => void;
}

const AddProductOptionModal: React.FC<AddProductOptionModalProps> = ({
  isOpen,
  onClose,
  onAddManually,
  onBrowseProducts,
}) => {
  const t = useTranslations("AddProductOptionModal");

  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-[420px] sm:w-[70%] lg:w-[40%] bg-[#A5282C] text-white rounded-lg shadow-lg p-4 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
          {t("add_a_product")}
        </h2>

        {/* Modal Content */}
        <p className="text-white text-center mb-4 sm:mb-8 text-sm sm:text-lg">
          {t("how_would_you_like_to_add_your_product")}
        </p>

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
          {/* Add Manually Button */}
          <button
            onClick={onAddManually}
            className="bg-[#FDF4E5] text-[#A5282C] py-2 px-6 sm:px-8 rounded-full font-medium hover:bg-[#F5E7D6] transition whitespace-nowrap w-full sm:w-auto text-base sm:text-lg"
          >
            {t("add_manually")}
          </button>

          {/* Browse Products Button */}
          <a
            href="/dashboard/explore"
            onClick={onBrowseProducts}
            className="bg-transparent border-2 border-[#FDF4E5] text-[#FDF4E5] py-2 px-6 sm:px-8 rounded-full font-medium hover:bg-[#FDF4E5]/20 transition whitespace-nowrap w-full sm:w-auto text-base sm:text-lg text-center"
          >
            {t("browse_our_products")}
          </a>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-2xl sm:text-2xl"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AddProductOptionModal;