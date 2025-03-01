"use client";

import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import LoadingBox from "@/components/LoadingBox";
import ProductCard from "@/components/ProductCard";
import AddProductModal from "@/components/aline_design/modals/AddProductModal";
import AddProductOptionModal from "@/components/aline_design/modals/AddProductOptionModal";
import { GET_WISHLIST_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl"; // Import translation hook
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShareWishlistModal from "@/components/aline_design/modals/ShareWishlistModal";
import { useMutation } from "@apollo/client";
import { INSERT_SHARED_WISHLIST } from "@/graphql/mutations";

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

const PAGE_SIZE = 4; // Number of items to load per page

const WishlistDetails: React.FC = () => {
  const params = useParams();
  const id = params.wishlist_id;
  const t = useTranslations("WishlistDetails"); // Use translations

  const [wishlistDetails, setWishlistDetails] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<WishlistItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const [insertSharedWishlist] = useMutation(INSERT_SHARED_WISHLIST);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

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
          }
        }
      } catch (error) {
        console.error("Failed to fetch wishlist data:", error);
      } finally {
        setLoading(false);
        

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

  // Function to handle adding a new product
  const handleAddProduct = (productData: {
    product_name: string;
    product_description: string;
    price: number;
    image_url: string;
    category: string;
    brand: string;
    store_link: string;
  }) => {
    console.log("New product added:", productData);
    closeAddProductModal();
  };

  if (loading)
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt={t("loading")}
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );

  if (!wishlistDetails) return <div>{t("noWishlistFound")}</div>;

  const readableDueDate = wishlistDetails.due_date
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
        setShareToken(generatedToken);
      } catch (error) {
        console.error("Error creating shared wishlist:", error);
      }
    };

  return (
    <div className="my-8 pl-8 sm:pl-0 flex flex-col gap-4 w-full pb-20 sm:mb-0 h-fit">
      <div className="flex flex-col gap-1 sm:gap-4 lg:justify-between lg:flex-row justify-between">
        <div>
          <h1 className="heading2">{wishlistDetails.title}</h1>
          <h2 className="heading4">
            {wishlistDetails.type.charAt(0).toUpperCase() +
              wishlistDetails.type.slice(1)}{" "}
            {t("list")}
          </h2>
        </div>
        <div className="flex flex-col sm:hidden mb-2">
          <p>{wishlistDetails.description}</p>
          <p className="text-sm">{t("dueDate")}: {readableDueDate}</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-8">
          {/* Add Product Button with Modal Trigger */}
          <GhostButtonBlack text={t("addProduct")} onClick={openOptionModal} />
          <SolidButtonBlack text={t("shareList")} onClick={() => setIsShareModalOpen(true)} />
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col">
        <p>{wishlistDetails.description}</p>
        <p className="text-sm">{t("dueDate")}: {readableDueDate}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mx-auto">
      {visibleItems.map((item) => {
        const products = Array.isArray(item.products) ? item.products : [item.products];
        const product = products[0]; // Now safely get the first item
        return (
          <ProductCard
            key={item.id}
            productName={product?.product_name || t("unnamedProduct")}
            productDescription={product?.product_description || t("noDescription")}
            imageUrl={product?.image_url || "/xmas.jpg"}
            wishlistId={wishlistDetails.id}
            productId={product?.id || ""}
          />
        );
      })}
      </div>
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
        wishlistId={wishlistDetails.id}
        shareToken={shareToken || wishlistDetails?.shared_wishlists?.[0]?.share_token}
        onGenerateShareLink={handleGenerateShareLink}
      />
    </div>
  );
};

export default WishlistDetails;