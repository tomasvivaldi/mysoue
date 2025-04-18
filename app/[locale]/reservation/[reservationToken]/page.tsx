'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { GET_RESERVED_GIFTS_BY_RESERVATION_TOKEN } from '@/graphql/queries';
import { UPDATE_RESERVED_GIFT } from '@/graphql/mutations';
import client from '@/apollo-client';
import LoadingBox from '@/components/LoadingBox';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import GhostButton1 from '@/components/buttons/GhostButton1';

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  price: number;
  image_url: string;
  affiliate_link: string;
  store_link: string;
}

interface WishlistUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Wishlist {
  id: string;
  title: string;
  type: string;
  description: string;
  due_date: string;
  require_address: boolean;
  address: string;
  users: WishlistUser[];
  shared_wishlists: SharedWishlist[];
}

interface ReservedGifts {
  id: string;
  wishlist_item_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  name_and_surname: string;
  private_message: string;
  status: string;
  expires_at: string;
  reservation_token: string;
  wishlists_items: WishlistItem[];
}

interface WishlistItem {
  products?: Product;
  external_products?: Product;
  wishlists: Wishlist[];
}

interface SharedWishlist {
  share_token: string;
}

interface StatusMessage {
  text: string;
  type: 'success' | 'error';
}

export default function ReservationPage() {
  const params = useParams();
  const t = useTranslations('ReservationPage');
  const reservation_token = params.reservationToken as string;
  const [reservationData, setReservationData] = useState<ReservedGifts[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const apolloClient = useApolloClient();

  const [updateReservedGift] = useMutation(UPDATE_RESERVED_GIFT);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (reservation_token) {
          const idResponse = await apolloClient.query({
            query: GET_RESERVED_GIFTS_BY_RESERVATION_TOKEN,
            variables: { reservation_token: reservation_token },
          });
          const reservationData = idResponse.data.reservedGiftsByReservationToken;
          if (reservationData) {
            setReservationData(reservationData);
            console.log("reservationData set to: ", reservationData);
          } else {
            console.error("Reservation data not found for ID:", reservation_token);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setStatusMessage({ text: t("failedToLoad"), type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [apolloClient, reservation_token]);

  const handleStatusChange = (newStatus: string) => {
    setPendingStatusChange(newStatus);
    setShowConfirmationModal(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatusChange || !reservationData[0]) return;
    
    try {
      setLoading(true);
      setStatusMessage(null);

      // Update the reservation status
      await updateReservedGift({
        variables: {
          id: reservationData[0].id,
          status: pendingStatusChange,
        },
      });
      
      // Update the local state with the new status
      const updatedReservationData = [...reservationData];
      updatedReservationData[0] = {
        ...updatedReservationData[0],
        status: pendingStatusChange
      };
      setReservationData(updatedReservationData);

      const wishlist = reservationData[0].wishlists_items?.[0]?.wishlists?.[0];
      console.log("*****wishlist: ", wishlist);
      const wishlistOwner = wishlist?.users?.[0];
      console.log("*****wishlistOwner: ", wishlistOwner);
      const wishlistOwnerName = wishlistOwner?.username ? wishlistOwner?.username : `${wishlistOwner.first_name} ${wishlistOwner.last_name}`;
      console.log("*****wishlistOwnerName: ", wishlistOwnerName);
      const wishlistOwnerEmail = wishlistOwner?.email;
      console.log("*****wishlistOwnerEmail: ", wishlistOwnerEmail);
      // Get product information
      const product = reservationData[0]?.wishlists_items?.[0]?.products;
      console.log("*****product: ", product);
      const externalProduct = reservationData[0]?.wishlists_items?.[0]?.external_products;
      console.log("*****externalProduct: ", externalProduct);
      const productName = product?.product_name || externalProduct?.product_name || 'your reserved gift';
      console.log("*****productName: ", productName);
      const listName = reservationData[0]?.wishlists_items[0]?.wishlists[0]?.title;
      console.log("*****listName: ", listName);
      const listLink = `${window.location.origin}/${params.locale}/dashboard/my-wishlists/${wishlist?.id}/${externalProduct ? 'external-product/' + externalProduct.id : 'product/' + product?.id}`;
      console.log("*****listLink: ", listLink);
      const giftName = reservationData[0]?.wishlists_items[0]?.products?.product_name || reservationData[0]?.wishlists_items[0]?.external_products?.product_name || 'Gift';
      console.log("*****giftName: ", giftName);
      const reserverName = reservationData[0]?.name_and_surname;
      console.log("*****reserverName: ", reserverName);
      // Construct link based on product type
      const productDashboardLink = `${window.location.origin}/${params.locale}/dashboard/my-wishlists/${wishlist?.id}/${externalProduct ? 'external-product/' + externalProduct.id : 'product/' + product?.id}`;
      console.log("*****productDashboardLink: ", productDashboardLink);
      // Send email notification based on the new status
      if (pendingStatusChange === 'canceled') {
        // Send cancellation email to the wishlist owner
        await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'giftCancelation',
            to: wishlistOwnerEmail,
            listName: listName,
            giftName: giftName,
            listLink: productDashboardLink,
            reserverName: reserverName,
            name: wishlistOwnerName,
          }),
        });
      } else if (pendingStatusChange === 'reserved') {
        // Send reservation email to the wishlist owner
        await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'sendGiftReservedEmail',
            to: wishlistOwnerEmail,
            listName: listName,
            giftName: giftName,
            listLink: productDashboardLink,
            reserverName: reserverName,
            name: wishlistOwnerName,
          }),
        });
      } else if (pendingStatusChange === 'purchased') {
        // Send purchase email to the wishlist owner
        await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'giftPurchased',
            to: wishlistOwnerEmail,
            listName: listName,
            giftName: giftName,
            listLink: productDashboardLink,
            purchaser: reserverName,
            name: wishlistOwnerName,
          }),
        });
      }

      setStatusMessage({
        text: t(`statusUpdated.${pendingStatusChange}`),
        type: 'success'
      });
      setShowConfirmationModal(false);
      setPendingStatusChange(null);
    } catch (error) {
      console.error('Error updating status:', error);
      setStatusMessage({
        text: t('errorUpdatingStatus'),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowConfirmationModal(false);
    }
  };

  if (loading && !reservationData.length) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <LoadingBox
          imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
          imageAlt="Loading spinner"
          imageClassName=""
          containerClassName="h-[80vh]"
        />
      </div>
    );
  }

  if (!reservationData.length) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">{t("reservationNotFound")}</h1>
        <p className="text-gray-600">{t("reservationNotFoundDesc")}</p>
      </div>
    );
  }

  const reservation = reservationData[0];
  console.log("reservation: ", reservation);
  const status = reservation.status;
  const wishlist = reservation.wishlists_items?.[0]?.wishlists?.[0];
  console.log("wishlist: ", wishlist);
  console.log("wishlist?.id: ", wishlist?.id);
  const wishlistOwner = wishlist?.users?.[0]?.first_name && wishlist?.users?.[0]?.last_name ? 
    `${wishlist.users[0].first_name} ${wishlist.users[0].last_name}` : 
    wishlist?.users?.[0]?.username;
  console.log("wishlistOwner: ", wishlistOwner);
  
  // Get product information
  const product = reservation.wishlists_items?.[0]?.products;
  const externalProduct = reservation.wishlists_items?.[0]?.external_products;
  console.log("reservation.wishlists_items: ", reservation.wishlists_items);
  console.log("product: ", product);
  console.log("externalProduct: ", externalProduct);

  // Determine which product to display
  const displayProduct = product || externalProduct;
  const isExternalProduct = !!externalProduct;

  return (
    <>
      <Head>
        <title>{t("title")} | Mysoue</title>
      </Head>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#A5282C] mb-2">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>
        
        {statusMessage && (
          <div className={`p-4 rounded-lg mb-6 ${
            statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {statusMessage.text}
          </div>
        )}
        
        {emailError && (
          <div className="p-4 rounded-lg mb-6 bg-yellow-100 text-yellow-800">
            {emailError}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reservation Details Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#A5282C]">{t("reservationDetails")}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("name")}</label>
                <p className="mt-1 text-gray-900">{reservation.name_and_surname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("email")}</label>
                <p className="mt-1 text-gray-900">{reservation.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("privateMessage")}</label>
                <p className="mt-1 text-gray-900">{reservation.private_message || 'No message provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("expiresAt")}</label>
                <p className="mt-1 text-gray-900">{new Date(reservation.expires_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("createdAt")}</label>
                <p className="mt-1 text-gray-900">{new Date(reservation.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Status Update Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#A5282C]">{t("updateStatus")}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("currentStatus")}</label>
                <div className="mb-4 px-3 rounded-lg bg-gray-100 ">
                  <span className="font-semibold text-gray-700">
                    {status === 'reserved' && t("reserved")}
                    {status === 'purchased' && t("purchased")} 
                    {status === 'canceled' && t("cancelled")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <GhostButton1
                    text={t("reserve")}
                    onClick={() => handleStatusChange('reserved')}
                    disabled={loading || status === 'reserved' || status === 'purchased'}
                  />
                  <GhostButton1
                    text={t("purchase")}
                    onClick={() => handleStatusChange('purchased')}
                    disabled={loading || status === 'purchased'}
                  />
                  <GhostButton1
                    text={t("cancel")}
                    onClick={() => handleStatusChange('canceled')}
                    disabled={loading || status === 'canceled'}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  {status === 'reserved' && t("reservedDesc")}
                  {status === 'purchased' && t("purchasedDesc")}
                  {status === 'canceled' && t("cancelledDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Card */}
        {displayProduct && (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#A5282C]">
              {isExternalProduct ? t("externalProductInfo") : t("productInfo")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayProduct.image_url && (
                <div className="flex justify-center items-center">
                  <img 
                    src={displayProduct.image_url} 
                    alt={displayProduct.product_name} 
                    className="max-h-48 object-contain rounded-lg"
                  />
                </div>
              )}
              <div className={`${displayProduct.image_url ? 'md:col-span-2' : 'md:col-span-3'} space-y-4`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("productName")}</label>
                  <p className="mt-1 text-gray-900 font-medium">{displayProduct.product_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("productDescription")}</label>
                  <p className="mt-1 text-gray-900">{displayProduct.product_description || 'No description provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("productPrice")}</label>
                  <p className="mt-1 text-gray-900 font-medium">
                    {displayProduct.price ? `$${displayProduct.price.toFixed(2)}` : 'Price not available'}
                  </p>
                </div>
                {(displayProduct.affiliate_link || displayProduct.store_link) && (
                  <div className="mt-4 gap-2 flex flex-row">
                    <div>
                      <a 
                        href={displayProduct.affiliate_link || displayProduct.store_link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#A5282C] hover:text-[#C64138] font-medium hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          const url = displayProduct.affiliate_link || displayProduct.store_link;
                          // Ensure URL is absolute
                          const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
                          window.open(absoluteUrl, '_blank');
                        }}
                      >
                        {t("viewProduct")}
                      </a>
                    </div>
                    <div>
                      <a
                        href={`/${params.locale}/${isExternalProduct ? `shared/${wishlist?.shared_wishlists?.[0]?.share_token}/external-product/${displayProduct.id}` : `shared/${wishlist?.shared_wishlists?.[0]?.share_token}/product/${displayProduct.id}`}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A5282C] hover:text-[#C64138] font-medium hover:underline"
                      >
                        {t("viewSharedWishlist")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Information Card */}
        {wishlist && (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#A5282C]">{t("wishlistInfo")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("wishlistTitle")}</label>
                  <p className="mt-1 text-gray-900">{wishlist.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("wishlistType")}</label>
                  <p className="mt-1 text-gray-900">{wishlist.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("wishlistDescription")}</label>
                  <p className="mt-1 text-gray-900">{wishlist.description || 'No description provided'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("dueDate")}</label>
                  <p className="mt-1 text-gray-900">{wishlist.due_date ? new Date(wishlist.due_date).toLocaleDateString() : 'No due date'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("addressRequired")}</label>
                  <p className="mt-1 text-gray-900">{wishlist.require_address ? t("yes") : t("no")}</p>
                </div>
                {wishlist.require_address && wishlist.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t("address")}</label>
                    <p className="mt-1 text-gray-900">{wishlist.address}</p>
                  </div>
                )}
                {wishlistOwner && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t("wishlistOwner")}</label>
                    <p className="mt-1 text-gray-900">
                      {wishlistOwner}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">{t("confirmStatusChange")}</h3>
            <p className="mb-6">
              {t("confirmMessage")} <span className="font-semibold">{pendingStatusChange}</span>?
            </p>
            <p className="mb-6 text-sm text-gray-600 italic">
              {t("ownerNotification")}
            </p>
            <div className="flex justify-end space-x-4">
              <GhostButton1
                text={t("cancel")}
                onClick={() => setShowConfirmationModal(false)}
              />
              <button
                onClick={() => confirmStatusChange()}
                className="px-4 py-2 bg-[#A5282C] text-white rounded-full hover:bg-[#C64138] transition"
                disabled={loading}
              >
                {loading ? t("updating") : t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 