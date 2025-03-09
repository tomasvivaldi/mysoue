"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Head from "next/head";
import ProductCard3 from "@/components/cards/ProductCard3";
import { GET_PRODUCTS_BY_PRELIST } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";

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

const mysoueListsPreListPage = () => {
  const { pre_list } = useParams() as { pre_list: string };
  const decodedPreList = decodeURIComponent(pre_list);

  const t = useTranslations("Dashboard-mysoueLists");
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
        <LoadingBox
          imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
          imageAlt="Loading spinner"
          imageClassName=""
          containerClassName="h-[80vh]"
        />
      </div>
    );
  }

  console.log("products:",products)

  return (
    <>
      <Head>
        <title>{t("pageTitle") || "MySoue Wishlists"}</title>
      </Head>
      <div className="container mx-auto px-4 mt-8 pb-24">
        <h1 className="text-3xl font-regular mb-6">
          {t("mysoueLists") || "MySoue Wishlists"}: {decodedPreList}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard3
              key={product.id}
              productId={product.id}
              preList={pre_list}
              imageUrl={product?.image_url}
              name={product?.product_name}
              price={product?.price}
              additionalDescription={product?.product_description}
              brand={product?.brand}
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

export default mysoueListsPreListPage;