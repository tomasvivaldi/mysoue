"use client";

import client from "@/apollo-client";
import { GET_PRODUCTS_BY_PRE_LIST } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingBox from "@/components/LoadingBox";
import ProductCard3 from "@/components/cards/ProductCard3";
import { motion } from "framer-motion";
import Head from "next/head";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";
import { FloatingButton } from "@/components/ui/FloatingButton";
import SolidButton from "@/components/buttons/SolidButton";

interface Product {
  id: string;
  product_name: string;
  product_name_thai: string;
  product_description: string;
  product_description_thai: string;
  price: number;
  image_url: string;
  store_link: string;
  affiliate_link: string;
  created_at: string;
  updated_at: string;
  platform: string;
  category: string;
  subcategory: string;
  brand: string;
  highlighted: boolean;
  pre_list: string;
}

const PAGE_SIZE = 6;

const ListDetails: React.FC = () => {
  const params = useParams();
  const listId = params.list_id as string;
  const t = useTranslations("Prelist-Product");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [listTitle, setListTitle] = useState<string>("");

  // Animation settings
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching products for pre_list:", listId);

        const response = await client.query({
          query: GET_PRODUCTS_BY_PRE_LIST,
          variables: { pre_list: listId },
        });

        console.log("Full GraphQL response:", response);
        console.log("Response data:", response?.data);
        console.log("Products data:", response?.data?.productsByPreList);

        const data = response?.data?.productsByPreList || [];
        console.log("Processed data:", data);
        
        setProducts(data);
        setVisibleItems(data.slice(0, PAGE_SIZE));
        
        // Set list title based on the first product's pre_list
        if (data.length > 0) {
          console.log("First product:", data[0]);
          setListTitle(data[0].pre_list);
        } else {
          console.log("No products found for pre_list:", listId);
        }
      } catch (error: any) {
        console.error("Failed to fetch products:", error);
        console.error("Error details:", {
          message: error?.message,
          graphQLErrors: error?.graphQLErrors,
          networkError: error?.networkError
        });
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [listId]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * PAGE_SIZE;
    const newItems = products.slice(startIndex, startIndex + PAGE_SIZE);

    setVisibleItems((prevItems) => [...prevItems, ...newItems]);
    setCurrentPage(nextPage);
  };

  const hasMoreItems = visibleItems.length < products.length;

  if (loading) {
    return (
      <>
        <Head>
          <title>{listTitle || "List Details"}</title>
        </Head>

        <SolidButton 
        text="Start Now" 
        href="/login" 
        className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" 
        />
        <FloatingButton/>

        <HeroBanner3
          backgroundImage="/Lists/bg.jpg"
          headingText={t("heroMain")}
          italicText={t("heroItalic")}
          textColor="text-[#fff] text-shadow"
        />

        <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
          <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
            <motion.h2
              variants={fadeIn}
              className="heading2 mb-4 font-simplemichael"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {t("preMadeListDescription")}
            </motion.h2>
          </div>

          <div className="flex items-center justify-center w-full h-[50vh]">
            <LoadingBox
              imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
              imageAlt="Loading spinner"
              imageClassName=""
              containerClassName="h-[10vh]"
            />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{listTitle || "List Details"}</title>
        </Head>

        <SolidButton 
        text="Start Now" 
        href="/login" 
        className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" 
        />
        <FloatingButton/>

        <HeroBanner3
          backgroundImage="/Lists/bg.jpg"
          headingText={t("heroMain")}
          italicText={t("heroItalic")}
          textColor="text-[#fff] text-shadow"
        />

        <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
          <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
            <motion.h2
              variants={fadeIn}
              className="heading2 mb-4 font-simplemichael"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {t("preMadeListDescription")}
            </motion.h2>
          </div>

          <div className="flex items-center justify-center w-full h-[50vh]">
            <p className="text-xl text-gray-600">{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <Head>
          <title>{listTitle || "List Details"}</title>
        </Head>

        <SolidButton 
        text="Start Now" 
        href="/login" 
        className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" 
        />
        <FloatingButton/>

        <HeroBanner3
          backgroundImage="/Lists/bg.jpg"
          headingText={t("heroMain")}
          italicText={t("heroItalic")}
          textColor="text-[#fff] text-shadow"
        />

        <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
          <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
            <motion.h2
              variants={fadeIn}
              className="heading2 mb-4 font-simplemichael"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {t("preMadeListDescription")}
            </motion.h2>
          </div>

          <div className="flex items-center justify-center w-full h-[50vh]">
            <p className="text-xl text-gray-600">{t("noProducts")}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{listTitle || "List Details"}</title>
      </Head>

      <SolidButton 
        text="Start Now" 
        href="/login" 
        className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" 
        />
        <FloatingButton/>

        <HeroBanner3
          backgroundImage="/Lists/bg.jpg"
          headingText={t("heroMain")}
          italicText={t("heroItalic")}
          textColor="text-[#fff] text-shadow"
        />

      <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
        <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {t("preMadeListDescription")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-10">
          {visibleItems.map((product) => (
            <ProductCard3
              key={product.id}
              href={`/explore/${product.id}`}
              preList={product.pre_list}
              imageUrl={product.image_url}
              name={product.product_name}
              price={product.price}
              additionalDescription={product.product_description}
              brand={product.brand}
              category={product.category}
              subcategory={product.subcategory}
            />
          ))}
        </div>

        {hasMoreItems && (
          <button
            onClick={handleLoadMore}
            className="mt-8 px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full uppercase text-xs tracking-widest text-black bg-transparent"
          >
            {t("loadMore")}
          </button>
        )}
      </div>
    </>
  );
};

export default ListDetails; 