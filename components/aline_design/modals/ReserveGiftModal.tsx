import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";
import { ADD_RESERVED_GIFT } from "@/graphql/mutations";

interface ReserveGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserve: (formData: { name: string; email: string; message: string }) => void;
  productImage: string; // URL of the product image
  wishlistItemId: string; // ID of the wishlist item associated with this reservation
}

const ReserveGiftModal: React.FC<ReserveGiftModalProps> = ({
  isOpen,
  onClose,
  onReserve,
  productImage,
  wishlistItemId,
}) => {
  const t = useTranslations("ReserveGiftModal");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [addReservedGift, { loading, error }] = useMutation(ADD_RESERVED_GIFT);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReserve = async () => {
    try {
      await addReservedGift({
        variables: {
          name_and_surname: formData.name,
          email: formData.email,
          private_message: formData.message,
          wishlist_item_id: wishlistItemId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, 
      });
      console.log("addReservedGift - formData:",formData)
      onReserve(formData);
      onClose();
    } catch (err) {
      console.error("Error reserving gift:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="overflow-y-auto relative bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Always-visible Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
        >
          &times;
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
          <img
            src={productImage}
            alt="Product"
            className="object-contain max-h-[90%] max-w-full rounded-lg shadow-md"
          />
        </div>

        {/* Form Section */}
        <div className="flex relative w-full md:w-1/2 bg-[#F4E8D0] p-8 flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            {t("modalTitle")}
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-black text-sm font-medium mb-1">
                {t("labelName")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-full outline-none text-black bg-white"
                placeholder={t("placeholderName")}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-black text-sm font-medium mb-1">
                {t("labelEmail")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-full outline-none text-black bg-white"
                placeholder={t("placeholderEmail")}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-black text-sm font-medium mb-1">
                {t("labelMessage")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg outline-none text-black bg-white h-24"
                placeholder={t("placeholderMessage")}
              ></textarea>
            </div>
          </form>
          <div className="flex flex-col items-center gap-3 mt-6">
            <button
              onClick={handleReserve}
              className="bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
              disabled={loading}
            >
              {t("reserveButton")}
            </button>
            <button onClick={onClose} className="text-[#6D6A65] text-sm hover:underline">
              {t("cancelButton")}
            </button>
            {error && (
              <p className="text-red-500 mt-2">Error reserving gift. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveGiftModal;