import React, { useState } from "react";
import ReceivedModal from "@/components/aline_design/modals/ReceivedModal"; // Import the modal

interface MyGiftCardProps {
  imageSrc: string; // Image source URL
  onReceived: () => void; // Callback for "I've Received" button
  onNotReceived: () => void; // Callback for "Haven't Received It Yet" button
}

const MyGiftCard: React.FC<MyGiftCardProps> = ({
  imageSrc,
  onReceived,
  onNotReceived,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-between bg-[#FBF9F4] rounded-2xl shadow-md p-4 w-64">
      {/* Gift Image */}
      <div className="w-full h-40 flex items-center justify-center mb-4">
        <img
          src={imageSrc}
          alt="Gift"
          className="object-contain h-full w-auto rounded-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={handleOpenModal}
          className="w-full text-[#6D6A65] border border-[#C6B8A2] py-2 rounded-full font-medium hover:bg-[#C6B8A2]/10 transition"
        >
          I'VE RECEIVED
        </button>
        <button
          onClick={onNotReceived}
          className="w-full text-[#6D6A65] border border-[#C6B8A2] py-2 rounded-full font-medium hover:bg-[#C6B8A2]/10 transition"
        >
          HAVEN'T RECEIVED IT YET
        </button>
      </div>

      {/* Received Modal */}
      <ReceivedModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          onReceived();
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default MyGiftCard;