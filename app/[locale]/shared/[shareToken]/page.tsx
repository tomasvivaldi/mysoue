"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import client from "@/apollo-client";
import { GET_SHARED_WISHLISTS_BY_TOKEN, GET_WISHLIST_BY_ID } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
import { useTranslations } from "next-intl";

interface Product {
  id: string;
  product_name: string;
  image_url: string;
  price: number;
  product_description: string;
}

interface WishlistItem {
  id: string;
  product_id: string;
  quantity: number;
  additional_description: string;
  products: Product;
}

interface Wishlist {
  id: string;
  title: string;
  description: string;
  due_date: string;
  require_address: boolean;
  address: string | null;
  wishlist_items: WishlistItem[];
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
        imageAlt={t("loading")}
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
      <h1 className="text-3xl font-bold mb-4">{wishlist.title}</h1>
      <p className="text-gray-700 mb-2">{wishlist.description}</p>
      {wishlist.due_date && (
        <p className="text-gray-600">{t("dueDate")}: {new Date(wishlist.due_date).toLocaleDateString()}</p>
      )}
      {wishlist.require_address && wishlist.address && (
        <p className="text-gray-600">{t("shippingAddress")}: {wishlist.address}</p>
      )}

      {/* Wishlist Items */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">{t("wishlistItems")}</h2>
        {wishlist.wishlist_items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {wishlist.wishlist_items.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-sm flex gap-4">
                {/* Product Image */}
                <img
                  src={item.products.image_url || "/placeholder.svg"}
                  alt={item.products.product_name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                {/* Product Details */}
                <div>
                  <h3 className="text-lg font-semibold">{item.products.product_name}</h3>
                  <p className="text-gray-700">{t("price")}: {item.products.price.toFixed(2)||"0"} THB</p>
                  {item.additional_description && (
                    <p className="text-sm text-gray-600">{t("additionalInfo")}: {item.additional_description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t("noWishlistItems")}</p>
        )}
      </div>
    </div>
  );
};

export default SharedWishlistPage;