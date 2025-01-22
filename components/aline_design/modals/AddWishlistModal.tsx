import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWishlistModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-[#FDF4E5] rounded-lg shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-6">NEW WISHLIST</h2>
          <p className="text-base text-gray-700 mb-8">Provide all the details for the gift list you'd like to create. This ensures your loved ones have the information they need.</p>
            <div className="flex flex-col gap-4">
                <a
                    className="w-fit mx-auto bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
                    href="/dashboard/create-new-wishlist"
                >
                    ADD
                </a>
                <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
                >
                GO BACK
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddWishlistModal;