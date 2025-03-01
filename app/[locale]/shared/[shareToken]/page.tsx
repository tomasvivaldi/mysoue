"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import client from "@/apollo-client";
import { GET_SHARED_WISHLISTS_BY_TOKEN, GET_WISHLIST_BY_ID } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
interface Product {
  affiliate_link: string;
  created_at: string;
  image_url: string;
  price: number;
  product_description: string;
  product_description_thai: string;
  id: string;
  product_name: string;
  product_name_thai: string;
  updated_at: string;
  platform: string;
  category: string;
  subcategory: string;
  brand: string;
  store_link: string;
  highlighted: boolean;
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
  products: Product;
  reserved_gifts: ReservedGifts[];
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

interface SharedWishlists {
    share_token: string;
    created_at: string;
    expires_at: string;
    wishlist_id: number;
    id: number;
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
  }

const SharedWishlistPage = () => {
  const { shareToken } = useParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const t = useTranslations("SharedWishlist");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Step 1: Get the shared wishlist by share token
        const { data: sharedData } = await client.query({
          query: GET_SHARED_WISHLISTS_BY_TOKEN,
          variables: { share_token: shareToken },
        });

        if (!sharedData.sharedWishlistsByToken.length) {
          setError(true);
          setLoading(false);
          return;
        }

        const wishlistId = sharedData.sharedWishlistsByToken[0].wishlist_id;

        // Step 2: Fetch wishlist details using wishlist_id
        const { data: wishlistData } = await client.query({
          query: GET_WISHLIST_BY_ID,
          variables: { id: wishlistId },
        });

        if (wishlistData.wishlistsById.length === 0) {
          setError(true);
          return;
        }

        setWishlist(wishlistData.wishlistsById[0]);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [shareToken]);

  if (loading) {
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt={"loading"}
        containerClassName="h-[80vh]"
      />
    );
  }

  if (error || !wishlist) {
    return <p className="text-center text-gray-500">{t("wishlistNotFound")}</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-6">
      {/* Wishlist Details */}
      <div className=" rounded-lg p-6 mb-8">
        <div className="flex flex-row justif items-center gap-2 ">
            <h1 className="text-3xl font-bold">
            {wishlist.title}
            </h1>
            <span> - </span>
            <p>{wishlist.type.charAt(0).toUpperCase() +
                wishlist.type.slice(1)} {" "} wishlist</p>
        </div>
        <p className="text-gray-600 mb-4">{wishlist.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.due_date && (
            <div>
              <h2 className="text-lg font-semibold mb-2">{t("dueDate")}:</h2>
              <p className="text-gray-600">
                {new Date(wishlist.due_date).toLocaleDateString()}
              </p>
            </div>
          )}
          {wishlist.require_address && wishlist.address && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {t("shippingAddress")}:
              </h2>
              <p className="text-gray-600">{wishlist.address}</p>
            </div>
          )}
        </div>
      </div>
  
    
      {/* Wishlist Items */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">{t("wishlistItems")}</h2>
          {wishlist.wishlist_items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishlist.wishlist_items.map((item) => {
                console.log("item?.products:",item?.products)
                const imageUrl = item?.products?.image_url || "/placeholder.svg";
                const name = item.products?.product_name;
                const price = item.products?.price;
                const productId = item.product_id;
                // Check if the gift for this wishlist item is already reserved
                const isGiftReserved = Boolean(
                  item?.reserved_gifts?.length
                );
                return (
                  <Link href={`/shared/${shareToken}/${productId}`} passHref key={item.id}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                      <div className="relative h-48 w-full">
                        <Image
                          src={imageUrl}
                          alt={name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">
                            {price ? `$${price.toFixed(2)}` : "$0.00"}
                          </span>
                          {isGiftReserved ? (
                            <span className="bg-red-100 text-red-800 font-semibold py-2 px-4 rounded-full">
                              Reserved
                            </span>
                          ) : (
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors duration-300">
                              Gift This
                            </button>
                          )}
                        </div>
                        {item.additional_description && (
                          <p className="text-sm text-gray-600 mt-2">
                            {t("additionalInfo")}: {item.additional_description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">{t("noWishlistItems")}</p>
          )}
        </div>
            </div>
          );
        };

export default SharedWishlistPage;