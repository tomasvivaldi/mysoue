"use client";

import React, { useEffect, useState } from "react";
import client from "@/apollo-client";
import MyGiftCard from "@/components/aline_design/Dashboard/MyGiftCard";
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID, GET_WISHLIST_BY_ID } from "@/graphql/queries";
import { useSession } from "next-auth/react";
import LoadingBox from "@/components/LoadingBox";
import { useTranslations } from "next-intl";
import { User } from "next-auth";
import ProductCard2 from "@/components/ProductCard2";

interface Gift {
  id: string;
  product_name: string;
  product_description: string;
  image_url: string;
  received: boolean;
  wishlist_id: string;
}

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
  wishlists: Wishlist[];
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


interface SharedWishlists {
  share_token: string;
  created_at: string;
  expires_at: string;
  wishlist_id: number;
  id: number;
}

interface UserById {
  created_at: string;
  email: string;
  id: string;
  oauth_provider: string;
  password_hash: string;
  profile_picture_url: string;
  updated_at: string;
  username: string;
  wishlists: Wishlist[];
}

interface UserWithProvider extends User {
  provider?: string;
}

const MyGifts: React.FC = () => {
  const { data: session } = useSession();
  const [wishlists, setWishlist] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("MyGifts");

  const user = session?.user as UserWithProvider;

  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);
        const userEmail = user?.email;

        ///// check if redux store is empty -> if yes: load and dispatch data | if no: dont do anything

        /// if (reduxData) -> load data
        ///  break
        ////// else -> run code below

        ///// when make changes on database also change redux data store     


        if (userEmail) {
          const emailResponse = await client.query({
            query: GET_USERS_BY_EMAIL,
            variables: { email: userEmail },
          });
          const userId = emailResponse.data.usersByEmail?.[0]?.id;
          if (userId) {
            const idResponse = await client.query({
              query: GET_USERS_BY_ID,
              variables: { id: userId },
            });
            const userData = idResponse.data.userDataById as UserById;
            const wishlistsData = userData?.wishlists || [];
            if (wishlistsData) {
              setWishlist(wishlistsData || []);
            } else {
              console.error("User data not found for ID:", userId);
            }



          }
        } else {
          console.log("No user email found, skipping data fetch.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGifts();
  }, [user?.email]);

  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);

        if (session?.user?.email) {
          const response = await client.query({
            query: GET_WISHLIST_BY_ID,
            variables: { id: 3 }, // Replace with dynamic ID or another variable
          });
          setWishlist(response?.data?.wishlistsById[0]?.wishlist_items || []);
        }
      } catch (error) {
        console.error("Failed to fetch gifts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGifts();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );
  }

  const organizeProductsByWishlist = (wishlists: Wishlist[]) => {
    const sharedWishlists: {
      id: string;
      title: string;
      reserved: WishlistItem[];
      unreserved: WishlistItem[];
      shared_wishlists: SharedWishlists[]; // ✅ Include shared_wishlists
    }[] = [];
  
    const nonSharedWishlists: {
      id: string;
      title: string;
      reserved: WishlistItem[];
      unreserved: WishlistItem[];
      shared_wishlists: SharedWishlists[]; // ✅ Include shared_wishlists
    }[] = [];
  
    wishlists.forEach((wishlist) => {
      const reservedProducts: WishlistItem[] = [];
      const unreservedProducts: WishlistItem[] = [];
  
      wishlist?.wishlist_items?.forEach((wishlistItem) => {
        const isProductReserved = Boolean(wishlistItem?.reserved_gifts?.length);
  
        if (isProductReserved) {
          reservedProducts.push(wishlistItem);
        } else {
          unreservedProducts.push(wishlistItem);
        }
      });
  
      const wishlistData = {
        id: wishlist.id,
        title: wishlist.title,
        reserved: reservedProducts,
        unreserved: unreservedProducts,
        shared_wishlists: wishlist.shared_wishlists || [], // ✅ Ensure this is included
      };
  
      // Check if the wishlist is shared
      const isShared = Boolean(wishlist.shared_wishlists?.[0]?.share_token);
  
      if (isShared) {
        sharedWishlists.push(wishlistData);
      } else {
        nonSharedWishlists.push(wishlistData);
      }
    });
  
    return { sharedWishlists, nonSharedWishlists };
  };
  const { sharedWishlists, nonSharedWishlists } = organizeProductsByWishlist(wishlists);

  return (
    <div className="my-8 px-4 flex flex-col gap-4 w-full">
  <div className="flex flex-row justify-between">
    <h1 className="heading2 px-8">{t("myGifts")}</h1>
  </div>

    {/* Shared Wishlists */}
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4 px-8">{t("sharedWishlists")}</h2>
      <div className="flex flex-col sm:flex-row h-fit overflow-scroll w-fit mx-auto gap-4 flex-wrap">
      {sharedWishlists?.length > 0 ? (
        sharedWishlists.map((wishlist) => (
          <div key={wishlist.id} className="mb-6 flex flex-col">
            <h2 className="text-xl font-bold">{wishlist.title}</h2>

            <h3 className="text-lg font-semibold mt-2">Reserved</h3>
            {wishlist.reserved && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.reserved.map((wishlistItem) => {                  
                  const product = wishlistItem?.products;
                  
                  return product ? (
                    <ProductCard2
                      key={wishlistItem?.id}
                      shareToken={wishlist.shared_wishlists?.[0]?.share_token || ""}
                      productId={product?.id}
                      imageUrl={product?.image_url || "/create1.png"}
                      name={product?.product_name}
                      price={product?.price}
                      isGiftReserved={Boolean(wishlistItem?.reserved_gifts?.length)}
                      additionalDescription={wishlistItem.additional_description}
                    />
                  ) : null;
                })}
              </div>
            )}

            <h3 className="text-lg font-semibold mt-2">Unreserved</h3>
            {wishlist.unreserved && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.unreserved.map((wishlistItem) => {
                  const product = wishlistItem?.products;
                  return product ? (
                    <ProductCard2
                      key={wishlistItem?.id}
                      shareToken={wishlist.shared_wishlists?.[0]?.share_token || ""}
                      productId={product?.id}
                      imageUrl={product?.image_url || "/create1.png"}
                      name={product?.product_name}
                      price={product?.price}
                      isGiftReserved={false}
                      additionalDescription={wishlistItem.additional_description}
                    />
                  ) : null;
                })}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 px-8">{t("noSharedWishlists")}</p>
      )}
    </div>
  </div>
</div>
  );
};

export default MyGifts;