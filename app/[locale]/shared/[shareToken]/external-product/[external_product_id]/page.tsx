"use client";
import client from "@/apollo-client";
import LoadingBox from "@/components/LoadingBox";
import ReserveGiftModal from "@/components/aline_design/modals/ReserveGiftModal";
import { GET_EXTERNAL_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const BackButtonWithNoSSR = dynamic(() => import("@/components/buttons/BackButton"), {
  ssr: false,
});


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
  id: string;
  reserved_gifts: ReservedGifts[];
  wishlists: Wishlist[];
}

interface Users {
  created_at: string;
  email: string;
  id: string;
  oauth_provider: string;
  password_hash: string;
  profile_picture_url: string;
  updated_at: string;
  username: string;
  birthdate: string;
  gender: string;
  first_name: string;
  last_name: string;
  reset_password_token: string;
  reset_password_expires: string;
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
  users: Users[];
}

interface ReservedGifts {
  id: string;
  wishlist_item_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  name_and_surname: string;
  private_message: string;
}

const ProductDetails: React.FC = () => {
  const t = useTranslations("Shared-Wishlists-ProductPage");
  const params = useParams();
  const router = useRouter();
  // Destructure product_id and shareToken from route parameters
  const { external_product_id, shareToken } = params;

  const [productDetails, setProductDetails] = useState<ExternalProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("productDetails:", productDetails);
  console.log(
    "productDetails?.wishlist_items?.[0]?.reserved_gifts?.[0]:",
    productDetails?.wishlist_items?.[0]?.reserved_gifts?.[0]
  );

  // Determine whether the gift is already reserved
  const isGiftReserved = Boolean(
    productDetails?.wishlist_items?.[0]?.reserved_gifts?.length
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleReserveGift = async (formData: { name: string; email: string; message: string; reservationToken: string }) => {
    try {
      // Get expiration date 
      let expiresAt;
      if (productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.due_date) {
        expiresAt = productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.due_date
      } else {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 90);
      }

      // Update local state
      setProductDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          wishlist_items: prev.wishlist_items.map((item, idx) => {
            if (idx === 0) {
              return {
                ...item,
                reserved_gifts: [
                  ...(item.reserved_gifts || []),
                  {
                    id: formData.reservationToken, // Using token as temporary ID
                    wishlist_item_id: item.id,
                    email: formData.email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    name_and_surname: formData.name,
                    private_message: formData.message,
                    reservation_token: formData.reservationToken,
                    status: "reserved",
                    expires_at: expiresAt,
                  },
                ],
              };
            }
            return item;
          }),
        };
      });

      // Close the modal
      setIsModalOpen(false);

      // Redirect to reservation management page
      router.push(`/${params.locale}/reservation/${formData.reservationToken}`);
    } catch (error) {
      console.error('Error handling reservation:', error);
      // Handle error appropriately
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

  return (
    <div className="w-full min-h-[80vh] x-paddings">
      {/* Back Button */}
      <div className="mt-4 ml-4">
        <BackButtonWithNoSSR />
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-center items-center md:gap-20 w-full">
        <div>
          <Image
            alt="Product Image"
            className="rounded-lg min-w-[350px] min-h-[350px]"
            src={productDetails?.image_url || "/create1.png"}
            width="400"
            height="400"
            style={{ aspectRatio: "400 / 400", objectFit: "cover" }}
          />
        </div>
        <div className="w-[80%] sm:w-1/2 md:max-w-[350px] flex flex-col mb-16 mt-8 md:mt-12 gap-0 md:gap-4">
          <h1 className="text-3xl font-bold">{productDetails?.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails?.price?.toFixed(2) || "-"} THB
          </p>
          <p className="text-base text-gray-700">
            {productDetails?.product_description}
          </p>
          <div className="my-2 flex flex-col w-full gap-2">
            <h2 className="text-2xl font-bold">{t("additionalDetails")}</h2>
            <p className="text-base text-gray-700">
              {productDetails?.wishlist_items?.[0]?.additional_description || <span className=" text-gray-500 ml-4 text-sm font-light">- No additional details added for this product</span>}
            </p>
          </div>
          {/* Conditional Rendering Based on Reservation Status */}
          {isGiftReserved ? (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-xl font-semibold text-[#A5282C]">
                - This gift is already reserved -
              </p>
              <p className="mt-2 text-xs text-gray-600 ml-8">
                Check the other presents available on the wishlist!
              </p>
            </div>
          ) : (
            <button
              onClick={handleOpenModal}
              className="bg-[#A5282C] text-white w-fit px-6 py-1 font-light rounded-full hover:bg-[#C64138] transition"
            >
              RESERVE
            </button>
          )}
        </div>
      </div>

      {/* Reserve Gift Modal */}
      {!isGiftReserved && (
        <ReserveGiftModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onReserve={handleReserveGift}
          productImage={productDetails?.image_url || "/create1.png"}
          wishlistItemId={productDetails?.wishlist_items?.[0]?.id}
          productName={productDetails?.product_name}
          wishlistOwnerName={productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.users?.[0]?.username || 
                            productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.users?.[0]?.first_name + ' ' + 
                            productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.users?.[0]?.last_name || 
                            'the wishlist owner'}
          wishlistOwnerEmail={productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.users?.[0]?.email}
          wishlistLink={`${window.location.origin}/${params.locale}/shared/${params.shareToken}`}
          wishlistName={productDetails?.wishlist_items?.[0]?.wishlists?.[0]?.title}
        />
      )}
    </div>
  );
};

export default ProductDetails;