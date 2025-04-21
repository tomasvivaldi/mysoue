import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface DeleteProductModalProps {
  isOpen: boolean;
  isWishlistShared: boolean;
  isProductReserved: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName?: string; 
  deletionLoading: boolean;
  status?: string;
  reserverName?: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  isWishlistShared,
  isProductReserved,
  onClose,
  onDelete,
  productName = "this product",
  deletionLoading,
  status = "reserved/purchased",
  reserverName,
}) => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");
  const [showSecondConfirmation, setShowSecondConfirmation] = useState(false);

  if (!isOpen) return null;

  const handleDeleteClick = () => {
    if (isProductReserved && !showSecondConfirmation) {
      setShowSecondConfirmation(true);
    } else {
      onDelete();
    }
  };

  const handleClose = () => {
    setShowSecondConfirmation(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-white rounded-lg shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-black">
            {showSecondConfirmation ? t("finalDeleteConfirmationTitle") : t("deleteProductTitle")}
          </h2>
          
          {!showSecondConfirmation && (isWishlistShared || isProductReserved) && (
            <p className="text-sm text-primary font-semibold">
              {isWishlistShared && !isProductReserved && t("wishlistSharedMessage")}
              {isProductReserved && t("productReservedMessage")}
            </p>
          )}
          
          {showSecondConfirmation ? (
            <p className="text-base text-gray-700">
              {t("reservedProductDeleteWarning", { productName, status, reserverName })}
            </p>
          ) : (
            <p className="text-base text-gray-700">
              {t("deleteConfirmation", { productName })}
            </p>
          )}

          <div className="flex justify-center gap-4">
            {/* Confirm Delete Button */}
            <button
              onClick={handleDeleteClick}
              className="bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
              disabled={deletionLoading}
            >
              {deletionLoading ? t("deletingButton") : (showSecondConfirmation ? t("confirmDeleteButton") : t("deleteButton"))}
            </button>

            {/* Cancel Button */}
            <button
              onClick={handleClose}
              className="bg-gray-200 text-gray-700 py-2 px-8 rounded-full font-medium hover:bg-gray-300 transition"
            >
              {t("cancelButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;