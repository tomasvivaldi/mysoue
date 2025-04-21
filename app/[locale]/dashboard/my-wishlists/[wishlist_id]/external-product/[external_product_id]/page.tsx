"use client";
import client from "@/apollo-client";
import LoadingBox from "@/components/LoadingBox";
import BackButton from "@/components/buttons/BackButton";
import { GET_EXTERNAL_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GhostButton1 from "@/components/buttons/GhostButton1";
import Link from "next/link";
import dynamic from "next/dynamic";
import SolidButton1 from "@/components/buttons/SolidButton1";
import ReservedGiftCard from "@/components/cards/ReservedGiftCard";
import SolidButton2 from "@/components/buttons/SolidButton2";
import DeleteProductModal from "@/components/aline_design/modals/DeleteProductModal";
import UpdateWishlistDetailsModal from "@/components/aline_design/modals/UpdateWishlistDetailsModal";
import { DELETE_WISHLIST_ITEMS, UPDATE_WISHLIST_ITEMS } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";


interface ExternalProduct {
  id: string;
  product_name: string;
  product_description?: string;
  price?: number;
  image_url?: string;
  category?: string;
  brand?: string;
  store_link?: string;
  created_at: string;
  updated_at: string;
  wishlist_items: WishlistItem[];
}


interface WishlistItem {
  added_at: string;
  additional_description: string;
  product_id: string;
  quantity: number;
  updated_at: string;
  wishlist_id: string;
  external_product_id: string;
  id: string;
  reserved_gifts: ReservedGifts[];
  wishlists: Wishlist[];
  external_products: ExternalProduct[];
}

interface SharedWishlists {
  share_token: string;
  created_at: string;
  expires_at: string;
  wishlist_id: number;
  id: number;
}

interface WishlistUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Wishlist {
  address: string;
  created_at: string;
  description: string;
  due_date: string;
  require_address: boolean;
  title: string;
  type: string;
  updated_at: string;
  user_id: string;
  id: string;
  wishlist_items: WishlistItem[];
  shared_wishlists: SharedWishlists[];
  users: WishlistUser[];
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
}

const BackButtonWithNoSSR = dynamic(
  () => import("@/components/buttons/BackButton"),
  { ssr: false }
);

const ExternalProductDetails: React.FC = () => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");
  const params = useParams();
  // const wishlist_id = params.wishlist_id as string;
  const external_product_id = params.external_product_id as string;

  const [productDetails, setProductDetails] = useState<ExternalProduct | null>(null);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log("****productDetails", productDetails);
  
  // Open update modal
  const handleUpdateDetails = () => {
    setIsUpdateModalOpen(true);
  };

  const [updateWishlistItem, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_WISHLIST_ITEMS);

  const handleModalConfirm = async (newMessage: string) => {
    if (!productDetails?.wishlist_items || productDetails?.wishlist_items.length === 0) {
      console.warn("No wishlist item available to update.");
      return;
    }
    const wishlistItem = productDetails?.wishlist_items[0]; // assuming the first item
    const now = new Date().toISOString();
    try {
      const { data } = await updateWishlistItem({
        variables: {
          id: wishlistItem.id,
          wishlist_id: wishlistItem.wishlist_id,
          external_product_id: wishlistItem.external_product_id,
          quantity: wishlistItem.quantity,
          additional_description: newMessage,
          updated_at: now,
          added_at: wishlistItem.added_at, // keep added_at unchanged
        },
      });
      console.log("Wishlist item updated:", data.updateWishlist_items);
      // Update local state so the UI reflects the new additional details
      setProductDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          wishlist_items: prev.wishlist_items.map((item) =>
            item.id === wishlistItem.id ? { ...item, additional_description: newMessage, updated_at: now } : item
          ),
        };
      });
    } catch (error) {
      console.error("Error updating wishlist item:", error);
    } finally {
      setIsUpdateModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!productDetails?.wishlist_items || productDetails?.wishlist_items.length === 0) {
      console.warn("No wishlist item found for deletion.");
      return;
    }
    const wishlistItem = productDetails?.wishlist_items[0];
    const reservedGift = wishlistItem?.reserved_gifts?.[0];
    const wishlist = wishlistItem?.wishlists?.[0];

    try {
      setDeletionLoading(true);
      const { data } = await client.mutate({
        mutation: DELETE_WISHLIST_ITEMS,
        variables: {
          id: wishlistItem.id,
        },
      });

      // Send email notification if the gift was reserved
      if (reservedGift && wishlist) {
        const shareToken = wishlist.shared_wishlists?.[0]?.share_token;
        console.log('Attempting to send deletion email:', {
          to: reservedGift.email,
          name: reservedGift.name_and_surname,
          listName: wishlist.title,
          giftName: productDetails.product_name,
          listLink: shareToken ? `${window.location.origin}/shared/${shareToken}` : undefined,
          wishlistOwnerName: `${wishlist?.users?.[0]?.first_name} ${wishlist?.users?.[0]?.last_name}` || wishlist?.users?.[0]?.username
        });

        try {
          const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: reservedGift.email,
              emailType: 'sendGiftDeletedEmail',
              name: reservedGift.name_and_surname,
              listName: wishlist.title,
              giftName: productDetails.product_name,
              listLink: shareToken ? `${window.location.origin}/shared/${shareToken}` : undefined,
              wishlistOwnerName: `${wishlist?.users?.[0]?.first_name} ${wishlist?.users?.[0]?.last_name}` || wishlist?.users?.[0]?.username
            }),
          });

          const result = await response.json();
          console.log('Email sending result:', result);

          if (!response.ok) {
            console.error('Failed to send email:', {
              status: response.status,
              statusText: response.statusText,
              result
            });
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }
      }

      setProductDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          wishlist_items: prev.wishlist_items.filter((item) => item.id !== wishlistItem.id),
        };
      });
      closeModal();
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    } finally {
      setDeletionLoading(false);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (external_product_id) {
          const { data } = await client.query({
            query: GET_EXTERNAL_PRODUCT_BY_ID,
            variables: { id: external_product_id },
          });
          console.log("data", data);
          // Assuming your query returns data in the form { externalProductById: ExternalProduct }
          const product = data?.externalProductById;
          console.log("product", product);
          setProductDetails(product);
        }
      } catch (error) {
        console.error("Failed to fetch external product data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [external_product_id]);


  if (loading)
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );

    if (!productDetails) return <div>{t("productNotFound")}</div>;

    const firstWishlistItem = productDetails?.wishlist_items?.[0];
    const isWishlistShared = Boolean(firstWishlistItem?.wishlists?.[0]?.shared_wishlists?.[0]?.share_token);
    const isProductReserved = Boolean(firstWishlistItem?.reserved_gifts?.length);
    const reservedGiftStatus = firstWishlistItem?.reserved_gifts?.[0]?.status || "reserved/purchased";
  
    const src = productDetails?.image_url || "/create1.png"
    return (
      <div className="w-full pb-20">
        {productDetails?.wishlist_items && productDetails?.wishlist_items.length === 0 ? (
          <div className="w-full text-center mt-4 relative px-4 py-6 sm:py-12 flex flex-col gap-2">
            <div className="absolute left-0 top-0">
              <BackButtonWithNoSSR />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {t("productNotInWishlist") || "Product Not In This Wishlist"}
            </h1>
            <p className="text-gray-600">
              {`The product "${productDetails?.product_name}" is not included in this wishlist.`}
            </p>
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-center text-sm text-gray-500">
                {t("browseAdditional") || "You can go back to view your wishlist or you can also browse all products by clicking below."}
              </p>
              <Link href="/dashboard/explore/">
                <GhostButton1 text={t("searchProducts") || "Search Products"} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-4  flex flex-col lg:flex-row items-center w-full gap-4">
              <Image
                alt="Product Image"
                className="rounded-lg w-full max-w-[400px]"
                src={src}
                style={{ aspectRatio: "1", objectFit: "cover" }}
                width={400}
                height={400}
              />
              <div className="w-full lg:w-1/2 px-4 md:px-0 flex flex-col mb-auto mt-12">
                <h1 className="text-3xl font-bold">{productDetails?.product_name}</h1>
                <p className="mt-2 text-xl font-light">
                  {productDetails?.price?.toFixed(2)} THB
                </p>
                <p className="mt-4 text-base text-gray-700">
                  {productDetails?.product_description}
                </p>
                <div className="mt-8 flex flex-col gap-4 w-full">
                  <SolidButton1 text={t("addDetailsButton")} onClick={handleUpdateDetails} />
                  <GhostButton1 text={t("viewOnWebsiteButton")} href={productDetails?.store_link} target="_blank" />
                  {updateError && <p className="text-red-500 mt-2">Error updating details.</p>}
                  {isProductReserved && (
                    <span className="text-xl px-4 font-semibold mx-auto text-primary">
                      - This product is already reserved -
                    </span>
                  )}
                  {isWishlistShared && !isProductReserved && (
                    <span className="text-lg px-4 font-semibold mx-auto text-gray-700">
                      - This product is on a shared wishlist and available for reservation -
                    </span>
                  )}
                </div>
                {/* Reservation Details Section */}
            {productDetails?.wishlist_items &&
            productDetails?.wishlist_items[0] &&
            productDetails?.wishlist_items[0].reserved_gifts &&
            productDetails?.wishlist_items[0].reserved_gifts.length > 0 && (
              <ReservedGiftCard
                reservedGift={productDetails?.wishlist_items[0].reserved_gifts[0]}
              />
            )}
              </div>
            </div>
            <div className="my-8 flex flex-col w-full px-10 gap-2">
              <h2 className="text-2xl font-bold">{t("additionalDetails")}</h2>
              {productDetails?.wishlist_items?.[0]?.additional_description ? (
                <p className="text-base text-gray-700 ml-2">
                  {productDetails?.wishlist_items?.[0]?.additional_description}
                </p>
              ) : (
                <p className="text-gray-400 ml-2">
                  No added notes, you can add it on the "Add Details" button
                </p>
              )}
              <div className="lg:px-4 py-2 self-start lg:self-end">
                <SolidButton2 text={t("deleteFromListButton")} onClick={openModal} />
              </div>
            </div>
          </>
        )}
        {/* Delete Product Modal */}
        <DeleteProductModal
          isOpen={isModalOpen}
          isWishlistShared={isWishlistShared}
          isProductReserved={isProductReserved}
          onClose={closeModal}
          onDelete={handleDelete}
          productName={productDetails?.product_name}
          deletionLoading={deletionLoading}
          status={reservedGiftStatus}
          reserverName={firstWishlistItem?.reserved_gifts?.[0]?.name_and_surname}
        />
        {/* Update Wishlist Details Modal */}
        <UpdateWishlistDetailsModal
          isOpen={isUpdateModalOpen}
          initialValue={productDetails?.wishlist_items?.[0]?.additional_description || ""}
          onClose={() => setIsUpdateModalOpen(false)}
          onConfirm={handleModalConfirm}
          loading={updateLoading}
        />
      </div>
    );
  };
  

export default ExternalProductDetails;