import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import client from "@/apollo-client";
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { gql, useMutation } from "@apollo/client";
import {INSERT_WISHLIST_ITEMS} from "@//graphql/mutations";

interface WishlistSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string; 
}

interface UserWithProvider extends User {
  provider?: string;
}


const WishlistSelectionModal: React.FC<WishlistSelectionModalProps> = ({ isOpen, onClose, productId }) => {
  const t = useTranslations("WishlistSelectionModal");
  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [selectedWishlist, setSelectedWishlist] = useState<any>(null);

  const [insertWishlistItems, { loading: mutationLoading, error: mutationError }] = useMutation(INSERT_WISHLIST_ITEMS);

  // 1. Extract fetchUserData function
  const fetchUserData = async () => {
    let fetchedData = null;
    try {
      setLoading(true);
      if (session?.user?.email) {
        // Fetch user by email
        const emailResponse = await client.query({
          query: GET_USERS_BY_EMAIL,
          variables: { email: session.user.email },
        });
        const userId = emailResponse.data.usersByEmail?.[0]?.id;
        console.log("userId", userId);
        if (userId) {
          const idResponse = await client.query({
            query: GET_USERS_BY_ID,
            variables: { id: userId },
          });
          const userDataById = idResponse.data.userDataById;
          if (userDataById) {
            setUserData(userDataById);
            console.log("userData updated to:", userDataById);
            fetchedData = userDataById;
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
    return fetchedData;
  };

  // 2. Update useEffect to call fetchUserData
  useEffect(() => {
    fetchUserData();
  }, [user?.email, session?.user?.email]);

  if (!isOpen) return null;

  if (loading) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-white rounded-lg shadow-lg p-8 ">
                <h2 className="text-2xl font-bold mb-4">{t("select_a_wishlist")}</h2>
                <LoadingBox
                imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
                imageAlt="Loading spinner"
                imageClassName=""
                containerClassName="h-[35vh]"
            />
            </div>
        </div>
    );
  }

  // Assuming userData contains an array of wishlists (adjust according to your API response)
  const wishlists = userData?.wishlists || [];

  const handleConfirm = async () => {
    if (!selectedWishlist) {
      console.warn("No wishlist selected.");
      return;
    }
    // Check if the product is already in the selected wishlist
    if (selectedWishlist.wishlist_items && selectedWishlist.wishlist_items.some((item: any) => item.product_id === productId)) {
      console.warn("Product already in wishlist.");
      return;
    }
    try {
      const now = new Date().toISOString();
      const response = await insertWishlistItems({
        variables: {
          wishlist_id: selectedWishlist.id,
          product_id: productId,
          quantity: 1,
          additional_description: "",
          updated_at: now,
          added_at: now,
        },
      });
      console.log("Wishlist item inserted:", response.data.insertWishlist_items);
      const newItem = response.data.insertWishlist_items;
      
      // Update the selectedWishlist state locally
      setSelectedWishlist((prev: any) => ({
        ...prev,
        wishlist_items: prev && prev.wishlist_items ? [...prev.wishlist_items, newItem] : [newItem],
      }));

      // Also update the userData state to update the corresponding wishlist in the list
      setUserData((prevUserData: any) => {
        if (!prevUserData || !prevUserData.wishlists) return prevUserData;
        const updatedWishlists = prevUserData.wishlists.map((wishlist: any) => {
          if (wishlist.id === selectedWishlist.id) {
            return {
              ...wishlist,
              wishlist_items: wishlist.wishlist_items ? [...wishlist.wishlist_items, newItem] : [newItem],
            };
          }
          return wishlist;
        });
        return { ...prevUserData, wishlists: updatedWishlists };
      });
      
      // At this point, the UI should reflect that the product is already added without closing the modal.
    } catch (error) {
      console.error("Error inserting wishlist item:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 max-h-screen p-10">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-white rounded-lg shadow-lg p-8 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{t("select_a_wishlist")}</h2>
        {wishlists.length === 0 ? (
          <p>{t("no_wishlists_found")}</p>
        ) : (
          <ul className="flex flex-col gap-2 ">
            {wishlists.map((wishlist: any) => {
                const alreadyAdded = wishlist.wishlist_items && wishlist.wishlist_items.some((item: any) => item.product_id === productId);
                return (
                    <li key={wishlist.id}>
                    <button
                        onClick={() => {
                        if (!alreadyAdded) {
                            setSelectedWishlist(wishlist);
                            console.log("Selected wishlist:", wishlist);
                        }
                        }}
                        disabled={alreadyAdded}
                        className={`w-full py-2 px-4 border rounded-xl text-left 

                            group flex items-center justify-between text-black text-sm
                       transition-all duration-300 ease-in-out hover:shadow-lg
                            ${
                        alreadyAdded
                            ? "bg-primary text-white cursor-not-allowed"
                            : selectedWishlist?.id === wishlist.id
                            ? "bg-[#FFF8E9] "
                            : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        {wishlist.title}
                    </button>
                    {alreadyAdded && 
                    <div className="flex flex-row pl-4 gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#C6B8A2" className="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                        </svg>
                        <p className="text-[#C6B8A2] text-sm">{t("already_in_list")}</p>
                    </div>}
                    </li>
                );
                })}
          </ul>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center">
            {selectedWishlist && (
            <div className="mt-4">
                <p>
                {t("selected_wishlist")}: {selectedWishlist.title}
                </p>
            </div>
            )}
            
            <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                {t("close")}
            </button>
            {selectedWishlist && (
                <button
                onClick={handleConfirm}
                className="bg-[#A5282C] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#8B1E26] transition"
                disabled={
                    mutationLoading ||
                    (selectedWishlist.wishlist_items && selectedWishlist.wishlist_items.some((item: any) => item.product_id === productId))
                }
                >
                {selectedWishlist.wishlist_items && selectedWishlist.wishlist_items.some((item: any) => item.product_id === productId)
                    ? t("already_in_list")
                    : (mutationLoading ? t("saving") : t("confirm"))}
                </button>
            )}
            </div>
            {mutationError && (
            <p className="text-red-500 mt-2">{t("error_adding_item")}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default WishlistSelectionModal;