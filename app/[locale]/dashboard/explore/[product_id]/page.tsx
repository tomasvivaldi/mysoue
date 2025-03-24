"use client";
import client from "@/apollo-client";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import LoadingBox from "@/components/LoadingBox";
import AddToWishlistModal from "@/components/aline_design/modals/AddToWishlistModal";
import WishlistSelectionModal from "@/components/aline_design/modals/WishlistSelectionModal";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SolidButton1 from "@/components/buttons/SolidButton1";
import GhostButton1 from "@/components/buttons/GhostButton1";

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

const ProductDetails: React.FC = () => {
  const t = useTranslations("Dashboard-Explore-ProductPage");
  const params = useParams();
  const id = params.product_id;

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isWishlistSelectionModalOpen, setIsWishlistSelectionModalOpen] = useState(false);

  const openWishlistModal = () => setIsWishlistModalOpen(true);
  const closeWishlistModal = () => setIsWishlistModalOpen(false);
  const openWishlistSelectionModal = () => setIsWishlistSelectionModalOpen(true);
  const closeWishlistSelectionModal = () => setIsWishlistSelectionModalOpen(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (id) {
          const { data } = await client.query({
            query: GET_PRODUCT_BY_ID,
            variables: { id: id },
          });
          setProductDetails(data?.productsById); 
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
        <div className="w-full px-4 lg:px-0 flex flex-col ">
          <h1 className="text-3xl font-bold">{productDetails?.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails?.price.toFixed(2)} THB
          </p>
          <p className="mt-4 text-base text-gray-700">
            {productDetails?.product_description}
          </p>
          <div className="mt-8 flex flex-col gap-4 w-full ">
            <SolidButton1 text={t("addToWishlistButton")} onClick={openWishlistModal} />
            <GhostButton1 text={t("viewOnWebsiteButton")} href={productDetails?.affiliate_link} target="_blank" />
          </div>
        </div>
      </div>

      {/* Add to Wishlist Modal */}
      <AddToWishlistModal
        isOpen={isWishlistModalOpen}
        onClose={closeWishlistModal}
        onCreateWishlist={() => {
          console.log("Opening Wishlist Selection Modal");
          closeWishlistModal();
          openWishlistSelectionModal();
        }}
        onBrowseWishlists={() => {
          console.log("Browsing wishlists");
          closeWishlistModal();
        }}
      />
      <WishlistSelectionModal
        isOpen={isWishlistSelectionModalOpen}
        onClose={closeWishlistSelectionModal} productId={productDetails?.id}      />
    </div>
  );
};

export default ProductDetails;