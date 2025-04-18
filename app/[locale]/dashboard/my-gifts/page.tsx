"use client";

import React, { useEffect, useMemo, useState } from "react";
import client from "@/apollo-client";
// import MyGiftCard from "@/components/aline_design/Dashboard/MyGiftCard"; // Unused
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries"; // Removed GET_WISHLIST_BY_ID
import { useSession } from "next-auth/react";
import LoadingBox from "@/components/LoadingBox";
import { useTranslations } from "next-intl";
import { User } from "next-auth";
import ProductCard2 from "@/components/cards/ProductCard2";
import SolidButton1 from "@/components/buttons/SolidButton1";
import SolidButton2 from "@/components/buttons/SolidButton2";
import GhostButton1 from "@/components/buttons/GhostButton1";

// --- Interfaces (keep as they are) ---
// Product, WishlistItem, ExternalProduct, ReservedGifts, Wishlist, SharedWishlists, UserById
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
  product_id: string; // Often references the internal 'products' table ID
  quantity: number;
  updated_at: string;
  wishlist_id: string;
  id: string; // This is the unique ID for the wishlist *item* itself
  products: Product; // The linked internal product (can be null/undefined if external)
  reserved_gifts: ReservedGifts[];
  wishlists: Wishlist[];
  external_products: ExternalProduct; // Linked external products (can be empty array)
}
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
  wishlist_id: string; // Ensure type matches Wishlist.id
  id: string; // Ensure type is consistent if used as key
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
// --- End Interfaces ---

// Define a type for the organized wishlist data
type OrganizedWishlist = {
  id: string;
  title: string;
  reserved: WishlistItem[];
  purchased: WishlistItem[];
  unreserved: WishlistItem[];
  shared_wishlists: SharedWishlists[];
};

interface UserWithProvider extends User {
  provider?: string;
}

const MyGifts: React.FC = () => {
  const { data: session } = useSession();
  // REMOVED: const [wishlists, setWishlist] = useState<Wishlist[]>([]);
  const [allWishlists, setAllWishlists] = useState<Wishlist[] | null>(null); // State used by useMemo
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [visibleReserved, setVisibleReserved] = useState<Record<string, number>>({});
  const [visiblePurchased, setVisiblePurchased] = useState<Record<string, number>>({});
  const [visibleUnreserved, setVisibleUnreserved] = useState<Record<string, number>>({});
  const [currentPages, setCurrentPages] = useState<Record<string, { reserved: number; purchased: number; unreserved: number }>>({});
  const [expandedWishlists, setExpandedWishlists] = useState<Record<string, boolean>>({});
  const [expandedSubSections, setExpandedSubSections] = useState<Record<string, { reserved: boolean; purchased: boolean; unreserved: boolean }>>({});

  const t = useTranslations("Dashboard-MyGifts");
  const user = session?.user as UserWithProvider;
  const PAGE_SIZE = 6;

  // --- Data Fetching useEffect ---
  useEffect(() => {
    const loadUserWishlists = async () => {
      // Keep setLoading(true) if re-fetching is possible, otherwise remove if only runs once
      // setLoading(true); // Set loading true when fetch starts
      const userEmail = user?.email;

      if (userEmail) {
        try {
          console.log("Fetching data for user:", userEmail); // Debug log
          const emailResponse = await client.query({
            query: GET_USERS_BY_EMAIL,
            variables: { email: userEmail },
            fetchPolicy: "network-only", // Or cache-and-network
          });
          const userId = emailResponse.data.usersByEmail?.[0]?.id;
          console.log("User ID found:", userId); // Debug log

          if (userId) {
            const idResponse = await client.query({
              query: GET_USERS_BY_ID,
              variables: { id: userId },
              fetchPolicy: "network-only", // Or cache-and-network
            });
            const userData = idResponse.data.userDataById as UserById;
            const wishlistsData = userData?.wishlists || [];
            console.log("Fetched wishlists data:", wishlistsData); // Debug log
            // SET THE CORRECT STATE VARIABLE FOR useMemo
            setAllWishlists(wishlistsData);
          } else {
            console.error("User ID not found for email:", userEmail);
            setAllWishlists([]); // Set empty if user ID not found
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setAllWishlists([]); // Set empty on error
        } finally {
          setLoading(false); // Set loading false when fetch ends
        }
      } else {
        console.log("No user email found, skipping data fetch.");
        setAllWishlists([]); // Set empty if no user
        setLoading(false); // Also set loading false here
      }
    };

    loadUserWishlists();
  }, [user?.email]); // Dependency is correct

  // --- Memoize the derived wishlist organization ---
  const { sharedWishlists, nonSharedWishlists } = useMemo(() => {
    if (!allWishlists) {
       console.log("useMemo: allWishlists is null, returning empty"); // Debug log
      return { sharedWishlists: [], nonSharedWishlists: [] };
    }
    console.log("useMemo: Processing allWishlists:", allWishlists); // Debug log

    const shared: OrganizedWishlist[] = [];
    const nonShared: OrganizedWishlist[] = [];

    allWishlists.forEach((wishlist) => {
      const reservedProducts: WishlistItem[] = [];
      const purchasedProducts: WishlistItem[] = [];
      const unreservedProducts: WishlistItem[] = [];

      (wishlist?.wishlist_items || []).forEach((wishlistItem) => {
        const hasReservedGifts = Boolean(wishlistItem?.reserved_gifts?.length);
        
        if (hasReservedGifts) {
          // Check if any of the reserved gifts have a status of "purchased"
          const hasPurchasedGifts = wishlistItem.reserved_gifts.some(
            gift => gift.status === "purchased"
          );
          
          if (hasPurchasedGifts) {
            purchasedProducts.push(wishlistItem);
          } else {
            reservedProducts.push(wishlistItem);
          }
        } else {
          unreservedProducts.push(wishlistItem);
        }
      });

      const wishlistData: OrganizedWishlist = {
        id: wishlist.id,
        title: wishlist.title,
        reserved: reservedProducts,
        purchased: purchasedProducts,
        unreserved: unreservedProducts,
        shared_wishlists: wishlist.shared_wishlists || [],
      };

      const isShared = Boolean(wishlist.shared_wishlists?.length > 0 && wishlist.shared_wishlists[0]?.share_token);
      if (isShared) {
        shared.push(wishlistData);
      } else {
        nonShared.push(wishlistData);
      }
    });
    console.log("useMemo: Result - Shared:", shared, "Non-Shared:", nonShared); // Debug log
    return { sharedWishlists: shared, nonSharedWishlists: nonShared };
  }, [allWishlists]); // Re-calculate only when allWishlists changes


  // --- Pagination Initialization useEffect ---
  useEffect(() => {
    const wishlistsToInitialize = [...sharedWishlists, ...nonSharedWishlists];
    console.log("Pagination useEffect: Wishlists to potentially initialize:", wishlistsToInitialize.length); // Debug log

    if (wishlistsToInitialize.length > 0) {
      wishlistsToInitialize.forEach(wishlist => {
        if (!currentPages[wishlist.id]) {
            console.log(`Initializing pagination for wishlist ID: ${wishlist.id}`); // Debug log
            initPagination(wishlist.id, wishlist.reserved.length, wishlist.purchased.length, wishlist.unreserved.length);
        } else {
            // console.log(`Pagination already initialized for wishlist ID: ${wishlist.id}`); // Optional debug
        }
      });
    }
  }, [sharedWishlists, nonSharedWishlists, currentPages]); // Dependencies are correct


  // --- Helper Functions ---

  const toggleWishlist = (wishlistId: string) => {
    setExpandedWishlists(prev => ({
      ...prev,
      [wishlistId]: !prev[wishlistId]
    }));
  };

  const initPagination = (wishlistId: string, reservedCount: number, purchasedCount: number, unreservedCount: number) => {
    setVisibleReserved(prev => ({
        ...prev,
        [wishlistId]: Math.min(PAGE_SIZE, reservedCount)
    }));
    setVisiblePurchased(prev => ({
        ...prev,
        [wishlistId]: Math.min(PAGE_SIZE, purchasedCount)
    }));
    setVisibleUnreserved(prev => ({
        ...prev,
        [wishlistId]: Math.min(PAGE_SIZE, unreservedCount)
    }));
    // Prevent overwriting if already exists (though the useEffect check should handle this)
    setCurrentPages(prev => ({
        ...prev,
        [wishlistId]: prev[wishlistId] || { reserved: 1, purchased: 1, unreserved: 1 }
    }));
  };

   // Handle loading more reserved items (ensure these functions are defined)
   const handleLoadMoreReserved = (wishlistId: string, totalCount: number) => {
     const currentPageData = currentPages[wishlistId] || { reserved: 0, purchased: 0, unreserved: 0 };
     const nextPage = currentPageData.reserved + 1;
     const newVisible = Math.min(nextPage * PAGE_SIZE, totalCount);

     setVisibleReserved(prev => ({
       ...prev,
       [wishlistId]: newVisible
     }));
     setCurrentPages(prev => ({
       ...prev,
       [wishlistId]: {
         ...currentPageData,
         reserved: nextPage
       }
     }));
   };

   // Handle loading more purchased items
   const handleLoadMorePurchased = (wishlistId: string, totalCount: number) => {
     const currentPageData = currentPages[wishlistId] || { reserved: 0, purchased: 0, unreserved: 0 };
     const nextPage = currentPageData.purchased + 1;
     const newVisible = Math.min(nextPage * PAGE_SIZE, totalCount);

     setVisiblePurchased(prev => ({
       ...prev,
       [wishlistId]: newVisible
     }));
     setCurrentPages(prev => ({
       ...prev,
       [wishlistId]: {
         ...currentPageData,
         purchased: nextPage
       }
     }));
   };

   // Handle loading more unreserved items (ensure these functions are defined)
   const handleLoadMoreUnreserved = (wishlistId: string, totalCount: number) => {
     const currentPageData = currentPages[wishlistId] || { reserved: 0, purchased: 0, unreserved: 0 };
     const nextPage = currentPageData.unreserved + 1;
     const newVisible = Math.min(nextPage * PAGE_SIZE, totalCount);

     setVisibleUnreserved(prev => ({
       ...prev,
       [wishlistId]: newVisible
     }));
     setCurrentPages(prev => ({
       ...prev,
       [wishlistId]: {
         ...currentPageData,
         unreserved: nextPage
       }
     }));
   };

   const toggleSubSection = (wishlistId: string, type: 'reserved' | 'purchased' | 'unreserved') => {
    setExpandedSubSections(prev => {
        const currentWishlistState = prev[wishlistId] || { reserved: true, purchased: true, unreserved: true }; // Default to expanded
        return {
            ...prev,
            [wishlistId]: {
                ...currentWishlistState,
                [type]: !currentWishlistState[type] // Toggle the specific type
            }
        };
    });
  };



  if (!loading && !allWishlists) {
       console.log("Rendering: No wishlists found message"); // Debug log
       return (
         <div className="my-8 px-4 flex flex-col gap-4 w-full text-center justify-center items-center">
          <div className="flex flex-col gap-2">
           <h1 className="heading2 px-8">{t("myGifts")}</h1>
   className="max-w-4xl "         <p>Here you can effortlessly manage and track the gifts you've added to various wishlists in one convenient location. It provides a clear, organized view of your gift selections, allowing you to easily see which items have already been reserved or purchased by others, and which are still available for selection. Whether you're organizing gifts for an event or coordinating with friends and family, this tool helps ensure that no duplicate gifts are purchased and everyone can see exactly what's been claimed. It's a hassle-free way to stay on top of your wishlists and avoid any confusion.</p>
          </div>
          <div className="flex flex-col max-w-md gap-2">
            <p className="text-gray-600">{t("noWishlistsFound")}</p> 
            <GhostButton1 text={"Create Wishlist"} href={"/dashboard/create-new-wishlist"} />
          </div>
         </div>
       );
  }

  const renderSubSectionContent = (
    items: WishlistItem[],
    visibleCount: number,
    handleLoadMore: () => void,
    totalCount: number,
    sectionType: 'reserved' | 'purchased' | 'unreserved',
    wishlist: OrganizedWishlist // Keep for context if needed (e.g., shareToken)
  ) => {

    // Show message if no items even if section is expanded
    if (items.length === 0) {
        return <p className="text-gray-500 px-4 pb-4">
          {sectionType === 'reserved' ? t('noReservedGifts') : 
           sectionType === 'purchased' ? t('noPurchasedGifts') : 
           t('noUnreservedGifts')}
        </p>;
    }
    return (
      <div className="p-4 bg-white"> {/* Added padding here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
          {items.slice(0, visibleCount).map((wishlistItem) => {
             // Data fallback logic (assuming external_products is an array)
             const wishlist_id = wishlistItem?.wishlist_id
             const internalProduct = wishlistItem.products;
             const externalProducts = wishlistItem?.external_products;
             const primaryExternalProduct = externalProducts;

             const internalProductId = internalProduct?.id;
             const externalProductId = primaryExternalProduct?.id; // Corrected ID access
             const linkId = internalProductId || externalProductId;

             if (!linkId) return null; // Skip if no ID

             // Construct href (using different paths example)
             const productLink = internalProductId ? `/dashboard/my-wishlists/${wishlist_id}/product/${internalProductId}`: `/dashboard/my-wishlists/${wishlist_id}/external-product/${externalProductId}`;

            return (
              <ProductCard2
                key={wishlistItem.id}
                href={productLink}
                imageUrl={internalProduct?.image_url || primaryExternalProduct?.image_url || "/create1.png"}
                name={internalProduct?.product_name || primaryExternalProduct?.product_name || t('productNameMissing')}
                price={internalProduct?.price ?? primaryExternalProduct?.price ?? 0}
                additionalDescription={internalProduct?.product_description || primaryExternalProduct?.product_description || ""}
                status={sectionType}
              />
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < totalCount && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-full mx-auto bg-[#A5282C] text-white hover:bg-[#C64138] transition"
            >
              {t("loadMore")}
            </button>
          </div>
        )}
      </div>
    );
  };


  // --- Main Render ---
  return (
    <div className="my-8 px-4 flex flex-col gap-4 w-full">
      <div className="flex flex-col justify-between mb-4 px-8">
        <h1 className="heading2 ">{t("myGifts")}</h1>
        <p className="max-w-4xl ">Here you can effortlessly manage and track the gifts you've added to various wishlists in one convenient location. It provides a clear, organized view of your gift selections, allowing you to easily see which items have already been reserved or purchased by others, and which are still available for selection. Whether you're organizing gifts for an event or coordinating with friends and family, this tool helps ensure that no duplicate gifts are purchased and everyone can see exactly what's been claimed. It's a hassle-free way to stay on top of your wishlists and avoid any confusion.</p>
      </div>

      {/* Shared Wishlists Section */}
      {sharedWishlists?.length !== 0 ? (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 px-8">{t("sharedWishlists")}</h2>
          <div className="flex flex-col gap-6 px-2 sm:px-8 mb-16">
            {sharedWishlists.map((wishlist) => {
              // Determine if subsections are expanded (default to true if not set)
              const isPurchasedExpanded = expandedSubSections[wishlist.id]?.purchased ?? true;
              const isReservedExpanded = expandedSubSections[wishlist.id]?.reserved ?? true;
              const isUnreservedExpanded = expandedSubSections[wishlist.id]?.unreserved ?? true;

              return (
              <div key={wishlist.id} className=" rounded-lg overflow-hidden shadow-lg border border-gray-200">
                {/* Collapsible Header for the WHOLE Wishlist */}
                 <div
                     className={`flex justify-between items-center p-4 cursor-pointer hover:bg-primary/90 hover:text-white duration-300 transition-colors ${expandedWishlists[wishlist.id] ? "bg-primary text-white" : "bg-gray-100" }`}
                     onClick={() => toggleWishlist(wishlist.id)}
                 >
                     {/* ... Wishlist Title and Counts ... */}
                     <div className="flex items-center gap-4">
                         <h2 className="text-xl font-bold">{wishlist.title}</h2>
                         <span className="text-sm opacity-80">({wishlist.purchased.length} {t('purchased')}, {wishlist.reserved.length} {t('reserved')}, {wishlist.unreserved.length} {t('unreserved')})</span>
                     </div>
                     {/* Main Chevron */}
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${expandedWishlists[wishlist.id] ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                 </div>

                {/* Collapsible Content for the WHOLE Wishlist */}
                {expandedWishlists[wishlist.id] && (
                  <div className="bg-gray-50 divide-y divide-gray-200"> {/* Background for inner content area, divider */}

                      {/* --- Purchased Gifts Subsection --- */}
                      <div>
                           {/* Clickable Header for Purchased */}
                            <div
                                className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100"
                                onClick={() => toggleSubSection(wishlist.id, 'purchased')}
                            >
                                <h3 className="text-lg font-semibold">{t("purchasedGifts")} ({wishlist.purchased.length})</h3>
                                {/* Subsection Chevron */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${isPurchasedExpanded ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                           </div>
                           {/* Conditionally Rendered Purchased Content */}
                           {isPurchasedExpanded && renderSubSectionContent(
                               wishlist.purchased,
                               visiblePurchased[wishlist.id] || 0,
                               () => handleLoadMorePurchased(wishlist.id, wishlist.purchased.length),
                               wishlist.purchased.length,
                               'purchased',
                               wishlist
                           )}
                       </div>
                      {/* --- End Purchased Gifts Subsection --- */}

                      {/* --- Reserved Gifts Subsection --- */}
                      <div>
                          {/* Clickable Header for Reserved */}
                          <div
                              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100" // Slightly different padding/hover
                              onClick={() => toggleSubSection(wishlist.id, 'reserved')}
                          >
                              <h3 className="text-lg font-semibold">{t("reservedGifts")} ({wishlist.reserved.length})</h3>
                              {/* Subsection Chevron */}
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${isReservedExpanded ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                          </div>
                          {/* Conditionally Rendered Reserved Content */}
                          {isReservedExpanded && renderSubSectionContent(
                              wishlist.reserved,
                              visibleReserved[wishlist.id] || 0,
                              () => handleLoadMoreReserved(wishlist.id, wishlist.reserved.length),
                              wishlist.reserved.length,
                              'reserved',
                              wishlist
                          )}
                      </div>
                      {/* --- End Reserved Gifts Subsection --- */}

                      {/* --- Unreserved Gifts Subsection --- */}
                       <div>
                           {/* Clickable Header for Unreserved */}
                            <div
                                className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100"
                                onClick={() => toggleSubSection(wishlist.id, 'unreserved')}
                            >
                                <h3 className="text-lg font-semibold">{t("unreservedGifts")} ({wishlist.unreserved.length})</h3>
                                {/* Subsection Chevron */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${isUnreservedExpanded ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                           </div>
                           {/* Conditionally Rendered Unreserved Content */}
                           {isUnreservedExpanded && renderSubSectionContent(
                               wishlist.unreserved,
                               visibleUnreserved[wishlist.id] || 0,
                               () => handleLoadMoreUnreserved(wishlist.id, wishlist.unreserved.length),
                               wishlist.unreserved.length,
                               'unreserved',
                               wishlist
                           )}
                       </div>
                      {/* --- End Unreserved Gifts Subsection --- */}

                  </div> // End inner content area
                )}
              </div> // End wishlist card
            )})}
          </div>
        </div>
      ):(<LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[30vh]"
      />)
      }

      {/* Empty State Messages (remain the same) */}
       {!loading && sharedWishlists.length === 0 && nonSharedWishlists.length > 0 && ( <p className="text-center text-gray-600 px-8">{t("noSharedWishlistsButPrivate")}</p> )}
       {!loading && sharedWishlists.length === 0 && nonSharedWishlists.length === 0 && allWishlists && allWishlists.length > 0 && ( <p className="text-center text-gray-600 px-8">{t("noSharedWishlists")}</p> )}

      {/* Non-Shared Wishlists Section (render similarly if needed) */}
      {/* ... */}

    </div>
  );
};

export default MyGifts;