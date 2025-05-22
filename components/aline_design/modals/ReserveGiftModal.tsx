import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";
import { ADD_RESERVED_GIFT } from "@/graphql/mutations";
import { v4 as uuidv4 } from 'uuid';

interface ReserveGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserve: (formData: { name: string; email: string; message: string; reservationToken: string }) => void;
  productImage: string; // URL of the product image
  wishlistItemId: string; // ID of the wishlist item associated with this reservation
  productName?: string; // Name of the product being reserved
  wishlistOwnerName?: string; // Name of the wishlist owner
  wishlistOwnerEmail?: string; // Email of the wishlist owner
  wishlistLink?: string; // Link to the wishlist
  wishlistName?: string; // Name of the wishlist
}

const ReserveGiftModal: React.FC<ReserveGiftModalProps> = ({
  isOpen,
  onClose,
  onReserve,
  productImage,
  wishlistItemId,
  productName = "the gift",
  wishlistOwnerName = "the wishlist owner",
  wishlistOwnerEmail = "",
  wishlistLink = "https://mysoue.com",
  wishlistName = "shared wishlist",
}) => {
  const t = useTranslations("ReserveGiftModal");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isReserving, setIsReserving] = useState(false);
  const [emailErrors, setEmailErrors] = useState<{
    confirmationEmail?: string;
    ownerNotification?: string;
  }>({});

  const [addReservedGift, { loading, error }] = useMutation(ADD_RESERVED_GIFT);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReserve = async () => {
    try {
      setIsReserving(true);
      // Reset email errors
      setEmailErrors({});
      
      // Generate a unique reservation token
      const reservationToken = uuidv4();
      
      // Calculate expiration date (7 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const { data } = await addReservedGift({
        variables: {
          name_and_surname: formData.name,
          email: formData.email,
          private_message: formData.message,
          wishlist_item_id: wishlistItemId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          reservation_token: reservationToken,
          status: "reserved",
          expires_at: expiresAt.toISOString(),
        },
      });

      if (data?.insertReservedGifts) {
        // Send confirmation email to person who reserved the gift
        try {
          const reservationLink = `${window.location.origin}/reservation/${reservationToken}`;
          
          console.log("Sending confirmation email with data:", {
            emailType: 'giftReservationConfirmation',
            to: formData.email,
            name: wishlistOwnerName,
            giftName: productName,
            deadline: expiresAt.toLocaleDateString(),
            reservationLink: reservationLink,
            wishlistLink: wishlistLink,
          });
          
          const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emailType: 'giftReservationConfirmation',
              to: formData.email,
              name: wishlistOwnerName,
              giftName: productName,
              deadline: expiresAt.toLocaleDateString(),
              reservationLink: reservationLink,
              wishlistLink: wishlistLink,
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Email API error response:", errorData);
            setEmailErrors(prev => ({
              ...prev,
              confirmationEmail: `Failed to send confirmation email: ${errorData.error || response.statusText}`
            }));
            throw new Error(`Email API error: ${response.status} ${response.statusText}`);
          }
          
          console.log("Confirmation email sent successfully");
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
          setEmailErrors(prev => ({
            ...prev,
            confirmationEmail: "Failed to send confirmation email. Please try again later."
          }));
          // Continue with the reservation process even if email fails
        }

        // Send notification email to wishlist owner
        try {
          // Get the wishlist name from the URL or use a default
          
          console.log("Sending gift reserved notification to wishlist owner:", {
            emailType: 'giftReserved',
            to: wishlistOwnerEmail,
            name: wishlistOwnerName,
            listName: wishlistName,
            giftName: productName,
            listLink: wishlistLink,
            wishlistName: wishlistName,
            reserverName: formData.name,
          });
          
          // Only send the email if we have the wishlist owner's email
          if (wishlistOwnerEmail) {
            const ownerResponse = await fetch('/api/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                emailType: 'giftReserved',
                to: wishlistOwnerEmail,
                name: wishlistOwnerName,
                listName: wishlistName,
                giftName: productName,
                listLink: wishlistLink,
                wishlistName: wishlistName,
                reserverName: formData.name,
              }),
            });
            
            if (!ownerResponse.ok) {
              const errorData = await ownerResponse.json();
              console.error("Wishlist owner email API error response:", errorData);
              setEmailErrors(prev => ({
                ...prev,
                ownerNotification: `Failed to notify wishlist owner: ${errorData.error || ownerResponse.statusText}`
              }));
              throw new Error(`Wishlist owner email API error: ${ownerResponse.status} ${ownerResponse.statusText}`);
            }
            
            console.log("Wishlist owner notification sent successfully");
          } else {
            console.log("Wishlist owner email not available, skipping notification");
          }
        } catch (ownerEmailError) {
          console.error("Error sending wishlist owner notification:", ownerEmailError);
          setEmailErrors(prev => ({
            ...prev,
            ownerNotification: "Failed to notify wishlist owner. Please try again later."
          }));
          // Continue with the reservation process even if email fails
        }

        onReserve({
          ...formData,
          reservationToken: data.insertReservedGifts.reservation_token,
        });
        onClose();
      }
    } catch (err) {
      console.error("Error reserving gift:", err);
    } finally {
      setIsReserving(false);
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
              disabled={isReserving || loading}
              className={`bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium transition ${
                isReserving || loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#C64138]'
              }`}
            >
              {isReserving || loading ? t("reserving") : t("reserveButton")}
            </button>
            <button 
              onClick={onClose} 
              className="text-[#6D6A65] text-sm hover:underline"
              disabled={isReserving || loading}
            >
              {t("cancelButton")}
            </button>
            {error && (
              <p className="text-red-500 mt-2">{t("errorMessage")}</p>
            )}
            {emailErrors.confirmationEmail && (
              <p className="text-red-500 mt-2 text-sm">{emailErrors.confirmationEmail}</p>
            )}
            {emailErrors.ownerNotification && (
              <p className="text-red-500 mt-2 text-sm">{emailErrors.ownerNotification}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveGiftModal;