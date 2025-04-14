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
import Head from "next/head";
import SolidButton from "@/components/buttons/SolidButton";
import { FloatingButton } from "@/components/ui/FloatingButton";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";

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
  const t = useTranslations("Explore-ProductPage");
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

  const src = productDetails?.image_url || "/create1.png"

  return (
    <>
    <Head>
      <title>Explore Products | Mysoue</title>
    </Head>
      <SolidButton text="Start Now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
      <FloatingButton/>
      <HeroBanner3
        backgroundImage={"/Product/bg.jpg"}
        headingText="FOR ALL"
        italicText="wishes"
        textColor="text-[#000]"
      />

      {loading && (
        <div className="mt-4">
          <LoadingBox
            imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
            imageAlt="Loading spinner"
            imageClassName=""
            containerClassName="h-[200px] md:h-[450px]"
          />
        </div>
      )}
      {!loading && !productDetails &&  <div>{t("productNotFound")}</div>}
    
    {!loading && productDetails &&
      <div className="w-full py-20 x-paddings2">
        <div className="mt-4  flex flex-col md:flex-row items-start w-full gap-4md : gap-8">
          <Image
            alt="Product Image"
            className="w-full h-full object-cover rounded-lg"
            src={src}
            style={{ aspectRatio: "1", objectFit: "cover" }}
            width={400}
            height={400}
          />
          <div className="w-full px-4 lg:px-0 flex flex-col  md:my-20">
            <h1 className="text-3xl font-bold">{productDetails?.product_name}</h1>
            <p className="mt-2 text-xl font-light">
              {productDetails?.price.toFixed(2)} THB
            </p>
            <p className="mt-4 text-base text-gray-700">
              {productDetails?.product_description}
            </p>
            <div className="mt-8 flex flex-col gap-4 w-full ">
              <GhostButton1 text={t("startMysoue")} href={"/login"} />
            </div>
          </div>
        </div>
      </div>
    }
  </>
  );
};

export default ProductDetails;