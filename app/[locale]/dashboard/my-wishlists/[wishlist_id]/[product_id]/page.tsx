"use client";
// pages/product/[id].tsx
import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import SolidButtonBrown from "@/components/SolidButtonBrown"; // Assuming you have a red button component
import BackButton from "@/components/buttons/BackButton";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries"; // Update your GraphQL query accordingly
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
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
const BackButtonWithNoSSR = dynamic(
  () => import("@/components/buttons/BackButton"),
  {
    ssr: false,
  }
);

const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params.product_id;

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (id) {
          const { data } = await client.query({
            query: GET_PRODUCT_BY_ID,
            variables: { id: id },
          });
          setProductDetails(data?.productsById[0]); // Update based on your actual GraphQL query response
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);
  console.log("data?.productsById", productDetails);
  if (loading) return <div>Loading...</div>;
  if (!productDetails) return <div>Product not found.</div>;

  return (
    <div className="w-full">
      {/* <BackButtonWithNoSSR /> */}
      <div className="mt-4 flex flex-col md:flex-row justify-around w-full">
        <div>
          <img
            alt="Product Image"
            className="rounded-lg"
            src={productDetails.image_url || "/placeholder.svg"}
            width="400"
            height="400"
            style={{ aspectRatio: "400 / 400", objectFit: "cover" }}
          />
        </div>
        <div className=" w-1/2 flex flex-col mb-auto mt-12">
          <h1 className="text-3xl font-bold">{productDetails.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails.price.toFixed(2)} THB
          </p>
          <p className="mt-4 text-base text-gray-700">
            {productDetails.product_description}
          </p>
          <div className="mt-8 flex flex-col gap-4 w-full">
            <SolidButtonBlack text="Add Details" />
            <GhostButtonBlack text="View on Website" />
          </div>
        </div>
      </div>
      <div className="my-8 flex flex-col w-full px-10 gap-2">
        <h2 className="text-2xl font-bold">Additional details</h2>
        <p className=" text-base text-gray-700">
          {/* Assuming this should be the additional description */}
          {productDetails.product_description}
        </p>
        <div className="px-4 self-end">
          <SolidButtonBlack text="Delete from list" />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
