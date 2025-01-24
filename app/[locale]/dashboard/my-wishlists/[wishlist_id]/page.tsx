"use client";
// pages/wishlist/[id].tsx
import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import GhostButtonWhite from "@/components/GhostButtonWhite";
import ProductCard from "@/components/ProductCard";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import AddProductModal from "@/components/aline_design/modals/AddProductModal";
import { Button2 } from "@/components/buttons/Button2";
import { GET_WISHLIST_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
}

const PAGE_SIZE = 4; // Number of items to load per page

const WishlistDetails: React.FC = () => {
  const params = useParams();
  const id = params.wishlist_id;

  const [wishlistDetails, setWishlistDetails] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<WishlistItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (id) {
          const response = await client.query({
            query: GET_WISHLIST_BY_ID,
            variables: { id },
          });
          const data = response?.data?.wishlistsById?.[0];
          setWishlistDetails(data || null);

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

  if (loading) return <div>Loading...</div>;
  if (!wishlistDetails) return <div>No wishlist found.</div>;

  const readableDueDate = wishlistDetails.due_date
    ? new Date(wishlistDetails.due_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "None";

  return (
    <div className="m-8 flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="heading2">
          {wishlistDetails.title} -{" "}
          {wishlistDetails.type.charAt(0).toUpperCase() +
            wishlistDetails.type.slice(1)}{" "}
          List
        </h1>
        <div className="flex gap-8">
          <GhostButtonBlack text="Add Product" onClick={() => setIsModalOpen(true)} />
          <SolidButtonBlack text="Share List" />
        </div>
      </div>
      <div>
        <p>{wishlistDetails.description}</p>
        <p className="text-sm">Due Date: {readableDueDate}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {visibleItems.map((item) => {
          const product = item.products[0]; // Assuming there's at least one product
          return (
            <ProductCard
              key={item.id}
              productName={product?.product_name || "Unnamed Product"}
              productDescription={
                product?.product_description || "No description"
              }
              imageUrl={product?.image_url || "/xmas.jpg"}
              wishlistId={wishlistDetails.id}
              productId={product?.id}
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
        {hasMoreItems ? "Load More" : "No More Items"}
      </button>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={(productName, productDescription) => {
          console.log("New Product Added:", { productName, productDescription });
        }}
      />
    </div>
  );
};

export default WishlistDetails;