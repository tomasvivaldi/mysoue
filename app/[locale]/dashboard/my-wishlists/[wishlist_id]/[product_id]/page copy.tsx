"use client";
// pages/product/[id].tsx
import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import LoadingBox from "@/components/LoadingBox";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import SolidButtonBrown from "@/components/SolidButtonBrown"; // Assuming you have a red button component
import DeleteProductModal from "@/components/aline_design/modals/DeleteProductModal";
import BackButton from "@/components/buttons/BackButton";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries"; // Update your GraphQL query accordingly
import { useTranslations } from "next-intl";
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
    // Add logic to delete the product here (e.g., API call)
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
          setProductDetails(data?.productsById[0]); // Adjust based on your query response structure
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return       <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />;
  if (!productDetails) return <div>{t("productNotFound")}</div>;

  return (
    <div className="w-full">
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
        <div className="w-1/2 flex flex-col mb-auto mt-12">
          <h1 className="text-3xl font-bold">{productDetails.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails.price.toFixed(2)} THB
          </p>
          <p className="mt-4 text-base text-gray-700">
            {productDetails.product_description}
          </p>
          <div className="mt-8 flex flex-col gap-4 w-full">
            <SolidButtonBlack text={t("addDetailsButton")} />
            <GhostButtonBlack text={t("viewOnWebsiteButton")} />
          </div>
        </div>
      </div>
      <div className="my-8 flex flex-col w-full px-10 gap-2">
        <h2 className="text-2xl font-bold">{t("additionalDetails")}</h2>
        <p className="text-base text-gray-700">
          {productDetails.product_description}
        </p>
        <div className="px-4 self-end">
          <SolidButtonBlack text={t("deleteFromListButton")} onClick={openModal} />
        </div>
      </div>

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        productName={productDetails.product_name}
      />
    </div>
  );
};

export default ProductDetails;