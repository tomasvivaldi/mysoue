import React from "react";

interface ReceivedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ReceivedModal: React.FC<ReceivedModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-[#A5282C] rounded-lg shadow-lg p-8 h-1/2 flex flex-col justify-center">
        {/* Modal Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">SWEET!</h2>

        {/* Modal Content */}
        <p className="text-white text-center mb-8">
          DO YOU WANT TO SEND A THANK YOU MESSAGE?
        </p>

        {/* Modal Buttons */}
        <div className="flex justify-center gap-4">
          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="bg-[#FDF4E5] text-[#A5282C] py-2 px-8 rounded-full font-medium hover:bg-[#F5E7D6] transition"
          >
            SURE
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="bg-transparent border-2 border-[#FDF4E5] text-[#FDF4E5] py-2 px-8 rounded-full font-medium hover:bg-[#FDF4E5]/20 transition"
          >
            NOT NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedModal;