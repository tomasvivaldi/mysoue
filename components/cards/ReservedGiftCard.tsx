import React from "react";
import { useTranslations } from "next-intl";

interface ReservedGift {
  id: string;
  wishlist_item_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  name_and_surname: string;
  private_message: string;
}

interface ReservedGiftCardProps {
  reservedGift: ReservedGift;
}

const ReservedGiftCard: React.FC<ReservedGiftCardProps> = ({ reservedGift }) => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");

  return (
    <div className="my-8 flex flex-col w-full gap-3 p-4 bg-[#A5282C] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white">{t("reservedGift")}</h2>
      <p className="text-gray-100">
        <strong>{t("reservedBy")}:</strong> {reservedGift.name_and_surname}
      </p>
      <p className="text-gray-100">
        <strong>{t("reserverEmail")}:</strong> {reservedGift.email}
      </p>
      <p className="text-gray-100">
        <strong>{t("privateMessage")}:</strong> "{reservedGift.private_message}"
      </p>
      <p className="text-gray-100">
        <strong>{t("dateReserved")}:</strong>{" "}
        {new Date(reservedGift.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReservedGiftCard;