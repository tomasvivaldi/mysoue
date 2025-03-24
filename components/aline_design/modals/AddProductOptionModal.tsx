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
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] min-w-fit bg-[#A5282C] rounded-lg shadow-lg p-8 h-1/2 flex flex-col justify-center">
        {/* Modal Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          {t("add_a_product")}
        </h2>

        {/* Modal Content */}
        <p className="text-white text-center mb-8 ">
          {t("how_would_you_like_to_add_your_product")}
        </p>

        {/* Modal Buttons */}
        <div className="flex justify-center gap-4">
          {/* Add Manually Button */}
          <button
            onClick={onAddManually}
            className="bg-[#FDF4E5] text-[#A5282C] py-2 px-8 rounded-full font-medium hover:bg-[#F5E7D6] transition whitespace-nowrap"
          >
            {t("add_manually")}
          </button>

          {/* Browse Products Button */}
          <a
            href="/lists"
            onClick={onBrowseProducts}
            className="bg-transparent border-2 border-[#FDF4E5] text-[#FDF4E5] py-2 px-8 rounded-full font-medium hover:bg-[#FDF4E5]/20 transition whitespace-nowrap"
          >
            {t("browse_our_products")}
          </a>
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

export default AddProductOptionModal;