import React from "react";

interface DeleteProductModalProps {
  isOpen: boolean;
  isWishlistShared: boolean;
  isProductReserved: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName?: string; 
  deletionLoading: boolean; // Added deletionLoading prop
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  isWishlistShared,
  isProductReserved,
  onClose,
  onDelete,
  productName = "this product",
  deletionLoading, // Destructured deletionLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-white rounded-lg shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-black">Delete Product</h2>
          {(isWishlistShared || isProductReserved) && (
            <p className="text-sm text-primary font-semibold">
              {isWishlistShared && !isProductReserved && "- This wishlist is currently being shared -"}
              {isProductReserved && "- This product is already reserved -"}              
            </p>
          )}
          <p className="text-base text-gray-700 ">
            Are you sure you want to delete <strong>{productName}</strong>? This
            action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            {/* Confirm Delete Button */}
            <button
              onClick={onDelete}
              className="bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
              disabled={deletionLoading} // Disabled if deletionLoading is true
            >
              {deletionLoading ? 'Deleting...' : 'DELETE'} 
            </button>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 py-2 px-8 rounded-full font-medium hover:bg-gray-300 transition"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;