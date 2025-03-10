"use client";
import client from "@/apollo-client";
import LoadingBox from "@/components/LoadingBox";
import SolidButtonBlack from "@/components/SolidButtonBlack";
import DeleteProductModal from "@/components/aline_design/modals/DeleteProductModal";
import BackButton from "@/components/buttons/BackButton";
import { DELETE_WISHLIST_ITEMS } from "@/graphql/mutations";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import GhostButton1 from "@/components/buttons/GhostButton1";
import SolidButton1 from "@/components/buttons/SolidButton1";
import SolidButton2 from "@/components/buttons/SolidButton2";

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
  const [deletionLoading, setDeletionLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleDelete = async () => {
    if (!productDetails?.wishlist_items || productDetails.wishlist_items.length === 0) {
      console.warn("No wishlist item found for deletion.");
      return;
    }
    const wishlistItem = productDetails.wishlist_items[0];
    try {
      setDeletionLoading(true);
      const { data } = await client.mutate({
        mutation: DELETE_WISHLIST_ITEMS,
        variables: {
          id: wishlistItem.id,
          wishlist_id: wishlistItem.wishlist_id,
          product_id: wishlistItem.product_id,
          quantity: wishlistItem.quantity,
          additional_description: wishlistItem.additional_description || "", 
          updated_at: wishlistItem.updated_at,
          added_at: wishlistItem.added_at,
        },
      });
      console.log("Wishlist item deleted:", data?.deleteWishlist_items);
  
      //  update the local state to remove the deleted wishlist item:
      setProductDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          wishlist_items: prev.wishlist_items.filter((item) => item.id !== wishlistItem.id),
        };
      });
  
      closeModal();
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    } finally {
      setDeletionLoading(false);
    }
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

  const firstWishlistItem = productDetails.wishlist_items?.[0];
  const isWishlistShared = Boolean(firstWishlistItem?.wishlists?.[0]?.shared_wishlists?.[0]?.share_token);
  const isProductReserved = Boolean(firstWishlistItem?.reserved_gifts?.length);

  return (
    <div className="w-full pb-20">

    {productDetails.wishlist_items && productDetails.wishlist_items.length === 0 ? (
      <div className="w-full text-center mt-4 relative px-4 py-6 sm:py-12 flex flex-col gap-2">
        <div className="absolute left-0 top-0"><BackButtonWithNoSSR /></div>
        <h1 className="text-2xl font-bold mb-2">
          {t("productNotInWishlist") || "Product Not In This Wishlist"}
        </h1>
        <p className=" text-gray-600">
          { `The product "${productDetails.product_name}" is not included in this wishlist.`}
        </p>
        <div className="flex flex-col gap-4 justify-center">
          <p className=" text-center text-sm text-gray-500">
            {t("browseAdditional") || "You can go back to view your wishlist or you can also browse all products by clicking below."}
          </p>
          <Link href="/dashboard/explore/">
            <GhostButton1 text={t("searchProducts") || "Search Products"} />
          </Link>
        </div>

        
      </div>
      ) : (
      <>
        <div className="mt-4 flex flex-col md:flex-row items-center w-full">
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
            <SolidButton1 text={t("addDetailsButton")} />
            <GhostButton1 text={t("viewOnWebsiteButton")} />
          {isProductReserved && <span className="text-xl px-4 font-semibold mx-auto text-primary">- This product is already reserved -</span>}
          {isWishlistShared && !isProductReserved && <span className="text-lg px-4 font-semibold mx-auto text-gray-700">- This product is on a shared wishlist and available for reservation -</span>}
          
          </div>
        </div>
      </div>
      <div className="my-8 flex flex-col w-full px-10 gap-2">
        <h2 className="text-2xl font-bold">{t("additionalDetails")}</h2>
        <p className="text-base text-gray-700">
          {productDetails.product_description}
        </p>
        <div className="lg:px-4 py-2 self-start lg:self-end">
          <SolidButton2 text={t("deleteFromListButton")} onClick={openModal} />
        </div>
      </div>
    </>
    )}     
      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isModalOpen}
        isWishlistShared={isWishlistShared}
        isProductReserved={isProductReserved}
        onClose={closeModal}
        onDelete={handleDelete}
        productName={productDetails.product_name}
        deletionLoading={deletionLoading}
      />
    </div>
  );
};

export default ProductDetails;