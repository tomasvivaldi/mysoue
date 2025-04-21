"use client";

import client from "@/apollo-client";
import ReservedGiftCard from "@/components/cards/ReservedGiftCard";
import LoadingBox from "@/components/LoadingBox";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
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
  status: string;
  expires_at: string;
  reservation_token: string;
}

const ProductDetails: React.FC = () => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");
  const params = useParams();
  const productId = params.product_id;

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (productId) {
          console.log("Fetching product data for productId:", productId);
          const { data } = await client.query({
            query: GET_PRODUCT_BY_ID,
            variables: { id: productId },
          });
          console.log("Product data fetched:", data);
          setProductDetails(data?.productsById);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt={t("loading")}
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );
  }

  if (!productDetails) {
    return <div>{t("productNotFound")}</div>;
  }

  return (
    <div className="w-full">
      <div className="mt-4 flex flex-col md:flex-row justify-around w-full">
        <div>
          <img
            alt="Product Image"
            className="rounded-lg"
            src={productDetails?.image_url || "/create1.png"}
            width="400"
            height="400"
            style={{ aspectRatio: "400 / 400", objectFit: "cover" }}
          />
        </div>
        <div className="w-full lg:w-1/2 px-4 md:px-0 flex flex-col mb-auto mt-12">
          <h1 className="text-3xl font-bold">{productDetails?.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails?.price.toFixed(2)} THB
          </p>
          <p className="mt-4 text-base text-gray-700">
            {productDetails?.product_description}
          </p>

          {/* Reservation Details Section */}
          {productDetails?.wishlist_items &&
          productDetails?.wishlist_items[0] &&
          productDetails?.wishlist_items[0].reserved_gifts &&
          productDetails?.wishlist_items[0].reserved_gifts.length > 0 && (
            <ReservedGiftCard
              reservedGift={productDetails?.wishlist_items[0].reserved_gifts[0]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;