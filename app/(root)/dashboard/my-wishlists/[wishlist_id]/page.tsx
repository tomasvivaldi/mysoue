"use client";
// pages/wishlist/[id].tsx
import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import GhostButtonWhite from "@/components/GhostButtonWhite";
import ProductCard from "@/components/ProductCard";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import { Button2 } from "@/components/buttons/Button2";
import { GET_WISHLIST_BY_ID } from "@/graphql/queries";
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

const WishlistDetails: React.FC = () => {
  const params = useParams();
  const id = params.wishlist_id;
  console.log("id", id);

  // Placeholder for the wishlist wishlistDetails state
  const [wishlistDetails, setWishlistDetails] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (id) {
          const wishlistDetails = await client.query({
            query: GET_WISHLIST_BY_ID,
            variables: { id: id },
          });
          setWishlistDetails(wishlistDetails?.data?.wishlistsById[0]);
          console.log(
            "wishlistDetails",
            wishlistDetails?.data?.wishlistsById[0]
          );
        } else {
          console.log("No user email found, skipping data fetch.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (!wishlistDetails) return <div>Loading...</div>;
  const readableDueDate = wishlistDetails.due_date
    ? new Date(wishlistDetails.due_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "none";
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
          <GhostButtonBlack text={"Add Product"} />
          <SolidButtonBlack text={"Share List"} />
        </div>
      </div>
      <div>
        <p>{wishlistDetails.description} </p>
        <p className="text-sm">due date: {readableDueDate}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {wishlistDetails.wishlist_items.map((item: WishlistItem) => {
          const product = item.products[0]; // Assuming there's at least one product
          return (
            <ProductCard
              key={item.id}
              productName={product?.product_name || "Unnamed Product"}
              productDescription={
                product?.product_description || "No description"
              }
              imageUrl={product?.image_url || "/xmas.jpg"} // Replace with your actual image URL
              wishlistId={wishlistDetails.id}
              productId={product?.id}
            />
          );
        })}
      </div>
      <button>Load More</button>
    </div>
  );
};

export default WishlistDetails;
