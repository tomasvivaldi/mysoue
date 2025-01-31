import React, { useState } from "react";

interface ReserveGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserve: (formData: { name: string; email: string; message: string }) => void;
  productImage: string; // URL of the product image
}

const ReserveGiftModal: React.FC<ReserveGiftModalProps> = ({
  isOpen,
  onClose,
  onReserve,
  productImage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReserve = () => {
    onReserve(formData);
    onClose();
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-black/50">
      {/* Left Side */}
      <div className="w-1/2 h-full flex items-center justify-center bg-[#FDF4E5]">
        <img
          src={productImage}
          alt="Product"
          className="object-contain max-h-[90%] max-w-[90%] rounded-lg shadow-md"
        />
      </div>

      {/* Right Side Modal */}
      <div className="w-1/2 h-full bg-[#F4E8D0] p-8 flex flex-col justify-center rounded-l-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          RESERVE GIFT
        </h2>

        {/* Form Fields */}
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-black text-sm font-medium mb-1">
              Name and surname:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-full outline-none text-black bg-[#FDF4E5]"
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-black text-sm font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-full outline-none text-black bg-[#FDF4E5]"
              placeholder="Your email"
            />
          </div>

          {/* Private Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-black text-sm font-medium mb-1"
            >
              Private message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg outline-none text-black bg-[#FDF4E5] h-24"
              placeholder="Your message"
            ></textarea>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <button
            onClick={handleReserve}
            className="bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
          >
            RESERVE
          </button>
          <button
            onClick={onClose}
            className="text-[#6D6A65] text-sm hover:underline"
          >
            THINK MORE ABOUT IT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveGiftModal;