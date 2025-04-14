"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Head from "next/head";
import ProductCard3 from "@/components/cards/ProductCard3";
import { GET_PRODUCTS_BY_PRELIST } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
import { motion } from "framer-motion";

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

const PAGE_SIZE = 6;

const mysoueListsPreListPage = () => {
  const { pre_list } = useParams() as { pre_list: string };
  const decodedPreList = decodeURIComponent(pre_list);

  const t = useTranslations("Dashboard-mysoueLists");
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Initialize pagination
  useEffect(() => {
    setVisibleProducts(products.slice(0, PAGE_SIZE));
    setCurrentPage(1);
  }, [products]);

  // Handle loading more products
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const newVisible = products.slice(0, nextPage * PAGE_SIZE);
    setVisibleProducts(newVisible);
    setCurrentPage(nextPage);
  };

  const hasMoreItems = visibleProducts.length < products.length;

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

  return (
    <>
      <Head>
        <title>{t("pageTitle") || "MySoue Wishlists"}</title>
      </Head>
      <div className="container mx-auto px-4 mt-8 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t("mysoueLists") || "MySoue Wishlists"}
            </h1>
            <p className="text-xl text-gray-600">
              {decodedPreList}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleProducts.map((product, index) => {
              const productId = product.id;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProductCard3
                    href={`/dashboard/explore/${productId}`}
                    preList={pre_list}
                    imageUrl={product?.image_url}
                    name={product?.product_name}
                    price={product?.price}
                    additionalDescription={product?.product_description}
                    brand={product?.brand}
                  />
                </motion.div>
              );
            })}
            {visibleProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="col-span-full text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {t("noProductsFound") || "No products available"}
                  </h3>
                  <p className="text-gray-600">
                    {t("noProductsDescription") || "This list is currently empty. Check back later for new additions!"}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {hasMoreItems && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className={`px-4 py-2 rounded-full ${
                  !loading
                    ? "bg-[#A5282C] text-white hover:bg-[#C64138] transition"
                    : "bg-gray-200 text-gray-500 cursor-wait"
                }`}
              >
                {t("loadMore") || "Load More"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default mysoueListsPreListPage;