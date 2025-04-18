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
  status: string;
  expires_at: string;
}

interface ReservedGiftCardProps {
  reservedGift: ReservedGift;
}

const ReservedGiftCard: React.FC<ReservedGiftCardProps> = ({ reservedGift }) => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");

  // Function to get status badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "reserved":
        return "bg-white";
      case "purchased":
        return "bg-white";
    }
  };

  // Function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "reserved":
        return t("reservedGiftStatus.reserved");
      case "purchased":
        return t("reservedGiftStatus.purchased");
      case "canceled":
        return t("reservedGiftStatus.canceled");
      default:
        return status;
    }
  };

  return (
    <div className="my-4 flex flex-col w-full gap-3 p-4 bg-[#A5282C] rounded-lg shadow-md ">
      <div className="flex justify-between items-start md:items-center gap-2 flex-col md:flex-row pr-10">
        <h2 className="text-2xl font-bold text-white ">{t("reservedGift")}</h2>
        <span className={`px-3 py-1 rounded-full text-primary text-sm font-medium whitespace-nowrap ${getStatusBadgeColor(reservedGift.status)}`}>
          {getStatusText(reservedGift.status)}
        </span>
      </div>
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