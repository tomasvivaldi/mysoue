import React, { useState } from "react";

interface DeleteWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  wishlistTitle?: string; // Optional: Show the wishlist title in the modal
}

const DeleteWishlistModal: React.FC<DeleteWishlistModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  wishlistTitle = "this wishlist",
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-white rounded-lg shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          disabled={isDeleting}
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-6">Delete Wishlist</h2>
          <p className="text-base text-gray-700 mb-8">
            Are you sure you want to delete <strong>{wishlistTitle}</strong>? This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            {/* Confirm Delete Button */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex items-center justify-center gap-2 py-2 px-8 rounded-full font-medium transition ${
                isDeleting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#A5282C] hover:bg-[#C64138]"
              } text-white`}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  DELETING...
                </>
              ) : (
                "DELETE"
              )}
            </button>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              disabled={isDeleting}
              className={`py-2 px-8 rounded-full font-medium transition ${
                isDeleting
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWishlistModal;