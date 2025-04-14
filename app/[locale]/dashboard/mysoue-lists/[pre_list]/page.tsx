"use client";

import { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Head from "next/head";
import ProductCard3 from "@/components/cards/ProductCard3";
import { GET_PRODUCTS_BY_PRELIST, GET_USERS_BY_EMAIL } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
import { motion } from "framer-motion";
import AddPrelistModal from "@/components/aline_design/modals/AddPrelistModal";
import { ADD_WISHLIST, ADD_WISHLIST_ITEMS_BATCH } from "@/graphql/mutations";
import { useSession } from "next-auth/react";
import client from "@/apollo-client";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addWishlistMutation] = useMutation(ADD_WISHLIST);
  const [addWishlistItemsBatchMutation] = useMutation(ADD_WISHLIST_ITEMS_BATCH);
  const { data: session } = useSession();

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

  const handleAddToWishlists = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    // TODO: Add any success feedback or navigation
  };

  const handleAddWishlist = async (data: {
    title: string;
    type: string;
    description: string;
    due_date: string | null;
    require_address: boolean;
    address: string | null;
  }) => {
    try {
      setIsLoading(true);

      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }

      // Fetch user by email
      const emailResponse = await client.query({
        query: GET_USERS_BY_EMAIL,
        variables: { email: session.user.email },
      });

      const userId = emailResponse.data.usersByEmail?.[0]?.id;
      if (!userId) {
        throw new Error("User not found");
      }

      // Create the wishlist
      const wishlistResponse = await addWishlistMutation({
        variables: {
          user_id: userId,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });

      const wishlistId = wishlistResponse.data.insertWishlists.id;

      // Add all products from the prelist to the wishlist
      if (products.length > 0) {
        const items = products.map(product => ({
          wishlist_id: wishlistId,
          product_id: product.id,
          external_product_id: null,
          quantity: 1,
          additional_description: product.product_description,
          updated_at: new Date().toISOString(),
          added_at: new Date().toISOString()
        }));

        await addWishlistItemsBatchMutation({
          variables: {
            items
          }
        });
      }

      // Let the modal handle the success state and closing
      return true;
    } catch (error) {
      console.error("Error creating wishlist:", error);
      // TODO: Add error toast notification
      return false;
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="flex items-center justify-between">
              <p className="text-xl text-gray-600">
                {decodedPreList}
              </p>
              <button
                className="px-6 py-3 bg-[#A5282C] text-white rounded-full hover:bg-[#C64138] text-sm font-medium transition-colors shadow-lg"
                onClick={handleAddToWishlists}
              >
                Add to My Wishlists
              </button>
            </div>
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

      <AddPrelistModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        preListType={decodedPreList}
        onSubmit={handleAddWishlist}
        isLoading={isLoading}
      />
    </>
  );
};

export default mysoueListsPreListPage;