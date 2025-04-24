"use client";

import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import LoadingBox from "@/components/LoadingBox";
import ProductCard from "@/components/ProductCard";
import AddProductModal from "@/components/aline_design/modals/AddProductModal";
import AddProductOptionModal from "@/components/aline_design/modals/AddProductOptionModal";
import EditWishlistModal from "@/components/aline_design/modals/EditWishlistModal";
import { GET_WISHLIST_BY_ID } from "@/graphql/queries";
import { ADD_EXTERNAL_PRODUCT, INSERT_WISHLIST_ITEMS } from "@/graphql/mutations";
import { useTranslations } from "next-intl"; // Import translation hook
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShareWishlistModal from "@/components/aline_design/modals/ShareWishlistModal";
import { useMutation } from "@apollo/client";
import { INSERT_SHARED_WISHLIST } from "@/graphql/mutations";
import ProductCard3 from "@/components/cards/ProductCard3";
import { useSession } from "next-auth/react";
import GhostButton1 from "@/components/buttons/GhostButton1";
import SolidButton1 from "@/components/buttons/SolidButton1";
import dynamic from "next/dynamic";
import EmptyWishlistCard from "@/components/cards/EmptyWishlistCard";

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
  pre_list: string;
  wishlist_items: WishlistItem[];
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

interface WishlistItem {
  added_at: string;
  additional_description: string;
  product_id: string;
  quantity: number;
  updated_at: string;
  wishlist_id: string;
  id: string;
  products: Product[];
  external_products: ExternalProduct[];
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

const BackButtonWithNoSSR = dynamic(
  () => import("@/components/buttons/BackButton"),
  { ssr: false }
);

const PAGE_SIZE = 6; // Number of items to load per page

const WishlistDetails: React.FC = () => {
  const { data: session } = useSession();
  const params = useParams();
  const id = params.wishlist_id;
  const wishlist_id = id;
  const t = useTranslations("WishlistDetails");

  const [wishlistDetails, setWishlistDetails] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<WishlistItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const [insertSharedWishlist] = useMutation(INSERT_SHARED_WISHLIST);
  const [insertWishlistItems, { loading: mutationLoading, error: mutationError }] = useMutation(INSERT_WISHLIST_ITEMS);
  const [externalProductId, setExternalProductId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setLoadingDone(false);

        if (id) {
          const response = await client.query({
            query: GET_WISHLIST_BY_ID,
            variables: { id },
          });
          const data = response?.data?.wishlistsById?.[0] as Wishlist;
          console.log("data",data)
          setWishlistDetails(data as Wishlist);
          setShareToken(data?.shared_wishlists?.[0]?.share_token)
          console.log("shareToken!!!!!!!!!",shareToken)
          // Initialize the first page of visible items
          if (data) {
            setVisibleItems(data.wishlist_items.slice(0, PAGE_SIZE));
            console.log("data.wishlist_items.slice(0, PAGE_SIZE)",data.wishlist_items.slice(0, PAGE_SIZE))
          }
        }
      } catch (error) {
        console.error("Failed to fetch wishlist data:", error);
      } finally {
        setLoading(false);
        setLoadingDone(true);
      }
    };

    loadData();
  }, [id]);

  const handleLoadMore = () => {
    if (wishlistDetails) {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * PAGE_SIZE;
      const newItems = wishlistDetails.wishlist_items.slice(
        startIndex,
        startIndex + PAGE_SIZE
      );

      setVisibleItems((prevItems) => [...prevItems, ...newItems]);
      setCurrentPage(nextPage);
    }
  };

  const hasMoreItems =
    wishlistDetails &&
    visibleItems.length < wishlistDetails.wishlist_items.length;

  // Function to handle opening the Add Product Option Modal
  const openOptionModal = () => setIsOptionModalOpen(true);
  const closeOptionModal = () => setIsOptionModalOpen(false);

  // Function to open the Add Product Modal
  const openAddProductModal = () => {
    closeOptionModal();
    setIsAddProductModalOpen(true);
  };
  const closeAddProductModal = () => setIsAddProductModalOpen(false);

  const readableDueDate = wishlistDetails?.due_date
    ? new Date(wishlistDetails.due_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : t("none");

  const handleGenerateShareLink = async (id: string) => {
    if (!wishlistDetails) return;    
    // Generate a new share token only if no existing one is found
    const generatedToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  
    try {
      console.log("Generating new share token. Wishlist ID:", id);
      console.log("Generated share token:", generatedToken);
  
      const { data } = await insertSharedWishlist({
        variables: {
          wishlist_id: id,
          share_token: generatedToken,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Expires in 7 days
        },
      });
  
      console.log("New shared wishlist created:", data);
      
      // Send wishlist share email
      const userEmail = session?.user?.email; 
      const name = session?.user?.name;
      const shareLink = generatedToken
      ? `${window.location.origin}/shared/${generatedToken}`
      : "-----error-----";
  

      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailType: 'wishlistShare',
          to: userEmail,
          name: `${name}`,
          wishlistLink:`${shareLink}`,
        }),
      });
      console.log("email sent to: ",userEmail);

      setShareToken(generatedToken);
    } catch (error) {
      console.error("Error creating shared wishlist:", error);
    }
  };

  // 2. Inside your component (e.g., WishlistDetails), add the mutation hook along with your other hooks:
  const [addExternalProduct, { loading: addProductLoading, error: addProductError }] = useMutation(ADD_EXTERNAL_PRODUCT);
  const now = new Date().toISOString();

  // 3. Update the handleAddProduct function to call the mutation:
  const handleAddProduct = async (productData: {
    product_name: string;
    product_description: string;
    price: number;
    image_url: string;
    category: string;
    brand: string;
    store_link: string;
  }) => {
    try {
      // Add external product and capture its ID in a local variable
      const response = await addExternalProduct({
        variables: {
          product_name: productData.product_name,
          product_description: productData.product_description,
          price: Number(productData.price),
          image_url: productData.image_url,
          category: productData.category,
          brand: productData.brand,
          store_link: productData.store_link,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });
      console.log("New external product added:", response.data);
      const newProductId = response.data?.insertExternalProduct?.id;
      setExternalProductId(newProductId);
      
      // Insert the new product into wishlist_items
      const now = new Date().toISOString();
      const insertResponse = await insertWishlistItems({
        variables: {
          wishlist_id: wishlist_id,
          external_product_id: newProductId,
          quantity: 1,
          additional_description: "",
          updated_at: now,
          added_at: now,
        },
      });
      console.log("Wishlist item inserted:", insertResponse.data.insertWishlist_items);
      const newItem = insertResponse.data.insertWishlist_items;
      
      // Update the visibleItems array with the new wishlist item
      setVisibleItems((prevItems) => [...prevItems, newItem]);
      
      // Optionally, you might also want to keep the modal open or provide further feedback here.
    } catch (error) {
      console.error("Error inserting wishlist item:", error);
    }
  };

  const handleEditWishlist = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (updatedWishlist: {
    id: string;
    title: string;
    description?: string;
    due_date?: string;
    require_address?: boolean;
    address?: string;
    type?: string;
  }) => {
    setWishlistDetails(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ...updatedWishlist
      };
    });
    setIsEditModalOpen(false);
  };

  if (loadingDone && !wishlistDetails) {
    return (
      <div className="flex flex-col min-h-screen x-paddings">
        <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
          <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
            <h2 className="heading2 mb-4 font-simplemichael">
              {t("wishlistNotFound")}
            </h2>
          </div>
          <div className="flex items-center justify-center w-full h-[50vh]">
            <p className="text-xl text-gray-600">{t("wishlistNotFoundMessage")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>              
      <div className=" mb-8 mt-4 pl-8 sm:pl-0 flex flex-col gap-4 w-full pb-24 sm:mb-0 h-fit">
        <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2">
          <div className="mt-4 md:mt-0 ml-2 order-2 md:order-1 whitespace-nowrap ">
            <BackButtonWithNoSSR />
          </div>
          <div className="flex flex-col gap-1 sm:gap-4 lg:justify-between lg:flex-row justify-between md:order-2">
            <div>
              {!loadingDone ? (
                <div className="animate-pulse">
                  <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <h1 className="heading2">{wishlistDetails?.title}</h1>
                  <h2 className="heading4">
                    {(wishlistDetails?.type && wishlistDetails.type.length > 0) 
                      ? wishlistDetails.type.charAt(0).toUpperCase() + wishlistDetails.type.slice(1)
                      : ""}{" "}
                    {t("list")}
                  </h2>
                </>
              )}
            </div>
            <div className="flex flex-col sm:hidden mb-2">
              {!loadingDone ? (
                <div className="animate-pulse">
                  <div className="h-4 w-64 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <p>{wishlistDetails?.description}</p>
                  <p className="text-sm">{t("dueDate")}: {readableDueDate}</p>
                </>
              )}
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
              <GhostButton1 text={t("editWishlist")} onClick={handleEditWishlist} />
              <GhostButton1 text={t("addProduct")} onClick={openOptionModal} />
              <SolidButton1 text={t("shareList")} onClick={() => setIsShareModalOpen(true)} />
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col">
          {!loadingDone ? (
            <div className="animate-pulse">
              <div className="h-4 w-64 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <>
              <p>{wishlistDetails?.description}</p>
              <p className="text-sm">{t("dueDate")}: {readableDueDate}</p>
            </>
          )}
        </div>

        {!loadingDone ? (
          <div className="flex items-center justify-center w-full h-[50vh]">
            <LoadingBox
              imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
              imageAlt="Loading spinner"
              imageClassName=""
              containerClassName="h-[10vh]"
            />
          </div>
        ) : (
          <>
            {visibleItems.length === 0 ? (
              <div className="w-full px-20 flex justify-center py-12">
                <EmptyWishlistCard onAddProductClick={openOptionModal} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {
                visibleItems.map((item) => {
                const products = Array.isArray(item.products) ? item.products : [item.products];
                const product = products[0];
                const productId = product?.id;
                const externalProducts = Array.isArray(item.external_products) ? item.external_products : [item.external_products];
                const externalProduct = externalProducts[0];
                const externalProductId = externalProduct?.id;
                const productLink = product?.id ? `/dashboard/my-wishlists/${wishlist_id}/product/${productId}`: `/dashboard/my-wishlists/${wishlist_id}/external-product/${externalProductId}`;
                return (
                  
                    <ProductCard3
                      href={productLink}
                      key={product?.id || externalProduct?.id}
                      preList={product?.pre_list || ""}
                      imageUrl={product?.image_url || externalProduct?.image_url || ""}
                      name={product?.product_name || externalProduct?.product_name}
                      price={product?.price || externalProduct?.price || 0}
                      additionalDescription={product?.product_description || externalProduct?.product_description}
                      brand={product?.brand || externalProduct?.brand}
                      category={product?.category || externalProduct?.category}
                      subcategory={product?.subcategory || ""}
                    />
                  );
                })}
                </div>
              </>
            )}
          </>
        )}

        {loadingDone && hasMoreItems && (
          <button
            onClick={handleLoadMore}
            disabled={!hasMoreItems}
            className={`mt-4 px-4 py-2 rounded-full ${
              hasMoreItems
                ? "bg-[#A5282C] text-white hover:bg-[#C64138] transition"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {hasMoreItems ? t("loadMore") : t("noMoreItems")}
          </button>
        )}

        {/* Add Product Option Modal */}
        <AddProductOptionModal
          isOpen={isOptionModalOpen}
          onClose={closeOptionModal}
          onAddManually={openAddProductModal}
          onBrowseProducts={() => console.log("Browse products clicked")}
        />

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isAddProductModalOpen}
          onClose={closeAddProductModal}
          onAddProduct={handleAddProduct}
        />

        {/* Share Wishlist Modal */}
        <ShareWishlistModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          wishlistId={wishlistDetails?.id || ""}
          shareToken={shareToken || wishlistDetails?.shared_wishlists?.[0]?.share_token}
          onGenerateShareLink={handleGenerateShareLink}
        />

        {/* Add EditWishlistModal */}
        <EditWishlistModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          wishlist={wishlistDetails ? {
            id: wishlistDetails.id,
            title: wishlistDetails.title,
            description: wishlistDetails.description,
            due_date: wishlistDetails.due_date,
            require_address: wishlistDetails.require_address,
            address: wishlistDetails.address,
            type: wishlistDetails.type
          } : null}
          onSuccess={handleEditSuccess}
        />
      </div>
    </>
  );
};

export default WishlistDetails;