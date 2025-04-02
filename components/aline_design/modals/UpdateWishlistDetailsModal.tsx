"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface UpdateWishlistDetailsModalProps {
  isOpen: boolean;
  initialValue?: string;
  onClose: () => void;
  onConfirm: (newMessage: string) => void;
  loading?: boolean;
}

const UpdateWishlistDetailsModal: React.FC<UpdateWishlistDetailsModalProps> = ({
  isOpen,
  initialValue = "",
  onClose,
  onConfirm,
  loading = false,
}) => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");
  const [message, setMessage] = useState(initialValue);

  useEffect(() => {
    setMessage(initialValue);
  }, [initialValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {t("updateDetailsTitle") || "Update Additional Details"}
        </h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            t("updateDetailsPlaceholder") || "Enter your message here..."
          }
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows={4}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            onClick={() => onConfirm(message)}
            disabled={message.trim() === "" || loading}
            className="bg-[#A5282C] text-white px-4 py-2 rounded-full hover:bg-[#C64138] transition disabled:opacity-50"
          >
            {loading ? t("updating") || "Updating..." : t("confirm") || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateWishlistDetailsModal;