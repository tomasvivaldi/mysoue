import React from "react";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName?: string; // Optional: Display the product name in the modal
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  productName = "this product",
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-6">Delete Product</h2>
          <p className="text-base text-gray-700 mb-8">
            Are you sure you want to delete <strong>{productName}</strong>? This
            action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            {/* Confirm Delete Button */}
            <button
              onClick={onDelete}
              className="bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
            >
              DELETE
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