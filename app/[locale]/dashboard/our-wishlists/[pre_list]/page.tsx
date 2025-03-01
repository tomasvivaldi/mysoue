"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Head from "next/head";
import Card from "@/components/Card";
import { GET_PRODUCTS_BY_PRELIST } from "@/graphql/queries";

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
  pre_list: string;
  wishlist_items: any[];
}

const OurWishlistsPreListPage = () => {
  // Extract and decode the pre_list parameter from the URL
  const { pre_list } = useParams() as { pre_list: string };
  const decodedPreList = decodeURIComponent(pre_list);
  
  const t = useTranslations("Dashboard-OurWishlists");
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GET_PRODUCTS_BY_PRELIST,
          variables: { pre_list: decodedPreList },
        });
        setProducts(data.productsByPreList);
        console.log("data?.productsByPreList?.image_url",data)
      } catch (error) {
        console.error("Failed to fetch products by pre_list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (decodedPreList) {
      loadData();
    }
  }, [client, decodedPreList]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t("pageTitle") || "Our Wishlists"}</title>
      </Head>
      <div className="container mx-auto px-4 mt-8 pb-24">
        <h1 className="text-3xl font-regular mb-6">
          {t("ourWishlists") || "Our Wishlists"}: {decodedPreList}
        </h1>
        <div className="flex flex-row flex-wrap gap-8 justify-center sm:justify-start">
          {products.map((product) => (
            <Card
              key={product.id}
              img={product.image_url}
              activity={product.product_name}
              type={product.pre_list}
              date={new Date(product.created_at).toLocaleDateString()}
              postpreview={product.product_description}
              id={product.id}
              href={`/dashboard/our-wishlists/${product.pre_list}/${product.id}`}
            />
          ))}
          {products.length === 0 && (
            <p className="text-center w-full">
              {t("noProductsFound") || "No products available for this list."}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default OurWishlistsPreListPage;