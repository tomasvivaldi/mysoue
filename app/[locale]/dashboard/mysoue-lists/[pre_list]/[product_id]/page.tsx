"use client";


//////////// TEMPLATE PAGE ////////////

import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import LoadingBox from "@/components/LoadingBox";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import DeleteProductModal from "@/components/aline_design/modals/DeleteProductModal";
import BackButton from "@/components/buttons/BackButton";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
  products: Product[];
  reserved_gifts: ReservedGifts[];
  wishlists: Wishlist[];
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

interface ReservedGifts {
  id: string;
  wishlist_item_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  name_and_surname: string;
  private_message: string;
}

const BackButtonWithNoSSR = dynamic(
  () => import("@/components/buttons/BackButton"),
  { ssr: false }
);

const ProductDetails: React.FC = () => {
  const t = useTranslations("Dashboard-MyWishlists-ProductPage");
  const params = useParams();
  const id = params.product_id;

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    console.log(`Product ${productDetails?.id} deleted.`);
    // Add your product deletion logic here (API call, etc.)
    closeModal();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (id) {
          const { data } = await client.query({
            query: GET_PRODUCT_BY_ID,
            variables: { id: id },
          });
          setProductDetails(data?.productsById); // Adjust based on your query response structure
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading)
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );
  if (!productDetails) return <div>{t("productNotFound")}</div>;

  // Determine wishlist sharing and reservation status using the first wishlist item
  const firstWishlistItem = productDetails?.wishlist_items?.[0];
  const isWishlistShared = Boolean(firstWishlistItem?.wishlists?.[0]?.shared_wishlists?.[0]?.share_token);
  const isProductReserved = Boolean(firstWishlistItem?.reserved_gifts?.length);

  const src = productDetails?.image_url || "/create1.png"

  return (
    <div className="w-full pb-20">
      <div className="mt-4  flex flex-col lg:flex-row items-center w-full gap-4">
        <Image
          alt="Product Image"
          className="rounded-lg w-full max-w-[400px]"
          src={src}
          style={{ aspectRatio: "1", objectFit: "cover" }}
          width={400}
          height={400}
        />
        <div className="w-1/2 flex flex-col mb-auto mt-12">
          <h1 className="text-3xl font-bold">{productDetails?.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails?.price.toFixed(2)} THB
          </p>
          <p className="mt-4 text-base text-gray-700">
            {productDetails?.product_description}
          </p>
          <div className="mt-8 flex flex-col gap-4 w-full">
            <SolidButtonBlack text={t("addDetailsButton")} />
            <GhostButtonBlack text={t("viewOnWebsiteButton")} />
          {isProductReserved && <span className="text-xl px-4 font-semibold mx-auto text-primary">- This product is already reserved -</span>}
          {isWishlistShared && !isProductReserved && <span className="text-lg px-4 font-semibold mx-auto text-gray-700">- This product is on a shared wishlist and available for reservation -</span>}
          
          </div>
        </div>
      </div>
      <div className="my-8 flex flex-col w-full px-10 gap-2">
        <h2 className="text-2xl font-bold">{t("additionalDetails")}</h2>
        <p className="text-base text-gray-700">
          {productDetails?.product_description}
        </p>
        <div className="px-4 self-end">
          <SolidButtonBlack text={t("deleteFromListButton")} onClick={openModal} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;