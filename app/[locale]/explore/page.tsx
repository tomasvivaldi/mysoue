"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeroBanner3 from "@/components/aline_design/HeroBanner3";
import SolidButton from "@/components/buttons/SolidButton";
import { FloatingButton } from "@/components/ui/FloatingButton";
import LoadingBox from "@/components/LoadingBox";
import { GET_PRODUCTS_LIST } from "@/graphql/queries";
import { useApolloClient } from "@apollo/client";
import { AnimatedLists } from "@/components/ui/AnimatedLists";
import ProductCard3 from "@/components/cards/ProductCard3";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { FilterContent } from "@/components/aline_design/FilterContent";


interface Product {
  id: string;
  shareToken: string;
  pre_list: string;
  image_url: string;
  product_name: string;
  price: number;
  product_description: string;
  brand: string;
  category: string;
  subcategory: string;
  isGiftReserved: boolean;
  rating?: number;
}

type WishlistItem = {
  title: string;
  description: string;
  link: string;
  src: string;
};


export default function Explore() {
  const t = useTranslations("ProductExplorer");

  const mockWishlists: WishlistItem[] = [
    {
      title: t("wishlist.baby.title"),
      description: t("wishlist.baby.description"),
      link: "/lists/baby-shower",
      src: "/baby.jpg",
    },
    {
      title: t("wishlist.herBirthday.title"),
      description: t("wishlist.herBirthday.description"),
      link: "/lists/her-birthday",
      src: "/bday.jpg",
    },
    {
      title: t("wishlist.christmas.title"),
      description: t("wishlist.christmas.description"),
      link: "/lists/christmas",
      src: "/xmas.jpg",
    },
    {
      title: t("wishlist.hisBirthday.title"),
      description: t("wishlist.hisBirthday.description"),
      link: "/lists/his-birthday",
      src: "/bg1.jpg",
    },
  ];

  const client = useApolloClient();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState<boolean>(false);
  
  const PAGE_SIZE = 12;
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch all products on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GET_PRODUCTS_LIST,
          variables: {
            category: null,
            subcategory: null,
            minPrice: null,
            maxPrice: null,
          },
        });
        setAllProducts(data.productsList);
      } catch (error) {
        console.error("Failed to fetch products list:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [client]);

  // Compute unique categories and price range
  const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category)));
  const computedMinPrice =
    allProducts.length > 0 ? Math.min(...allProducts.map((p) => p.price)) : 0;
  const computedMaxPrice =
    allProducts.length > 0 ? Math.max(...allProducts.map((p) => p.price)) : 0;

  // Compute mapping from category to its unique subcategories
  const categoriesMap = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    if (!acc[product.category].includes(product.subcategory)) {
      acc[product.category].push(product.subcategory);
    }
    return acc;
  }, {} as Record<string, string[]>);

  // Initialize filters when products load
  useEffect(() => {
    if (allProducts.length > 0) {
      setPriceRange([computedMinPrice, computedMaxPrice]);
      setFilteredProducts(allProducts);
    }
  }, [allProducts, computedMinPrice, computedMaxPrice]);

  // Apply filters and sort when filter states change
  useEffect(() => {
    let result = [...allProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
      // "featured" – no extra sorting
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedSubcategories, priceRange, sortBy, allProducts]);

  // Initialize pagination
  useEffect(() => {
    setVisibleProducts(filteredProducts.slice(0, PAGE_SIZE));
    setCurrentPage(1);
  }, [filteredProducts]);

  // Handle loading more products
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const newVisible = filteredProducts.slice(0, nextPage * PAGE_SIZE);
    setVisibleProducts(newVisible);
    setCurrentPage(nextPage);
  };

  const hasMoreItems = visibleProducts.length < filteredProducts.length;

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange([computedMinPrice, computedMaxPrice]);
    setSortBy("featured");
  };

  return (
    <>
      <Head>
        <title>Explore Products | Mysoue</title>
      </Head>
        <SolidButton text="Start Now" href="/login" className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" />
        <FloatingButton/>
        <HeroBanner3
          backgroundImage={"/Explore/bg.jpg"}
          headingText="EXPLORE"
          italicText="our products"
          textColor="text-[#fff] text-shadow"
        />

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
          <div className="flex flex-col">
              <div className="container mx-auto px-4 py-8 relative">
                <h1 className="text-4xl font-bold mb-8 text-center">{t("exploreProductsTitle")}</h1>
                <h2 className="text-3xl font-semibold text-center">{t("featuredWishlistsTitle")}</h2>
                <AnimatedLists wishlists={mockWishlists} />
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">{t("browseProductsTitle")}</h2>
                    <div className="mb-4 pl-4 md:pl-0">
                      <button
                        onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                        className="underline hover:text-gray-600"
                      >
                        {t("filters")}
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                      <p className="text-sm">
                        {t("showingProducts", { count: visibleProducts.length, total: allProducts.length })}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{t("sortBy")}</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="p-2 border rounded-md"
                        >
                          <option value="price-low-high">{t("priceLowHigh")}</option>
                          <option value="price-high-low">{t("priceHighLow")}</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {visibleProducts.map((product) => (
                      <ProductCard3
                        href={""}
                        key={product.id}
                        preList={product.pre_list}
                        imageUrl={product.image_url}
                        name={product.product_name}
                        price={product.price}
                        additionalDescription={product.product_description}
                        brand={product.brand}
                        category={product.category}
                        subcategory={product.subcategory}
                        modal={true}
                      />
                    ))}
                    </div>
                    <div className="flex flex-col items-center mt-6">
                      {hasMoreItems && (
                        <button
                          onClick={handleLoadMore}
                          disabled={loading}
                          className={`px-4 py-2 rounded-full ${
                            !loading
                              ? "bg-[#A5282C] text-white hover:bg-[#C64138] transition"
                              : "bg-gray-200 text-gray-500 cursor-wait"
                          }`}
                        >
                          {t("loadMore")}
                        </button>
                      )}
                      {loading && (
                        <div className="mt-4">
                          <LoadingBox
                            imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
                            imageAlt="Loading spinner"
                            imageClassName=""
                            containerClassName=""
                          />
                        </div>
                      )}
                    </div>
                    {filteredProducts.length === 0 && !loading && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-lg font-medium mb-2">{t("noProductsFound")}</p>
                        <p className="mb-4">
                          {t("adjustFilters")}
                        </p>
                        <button onClick={clearFilters} className="bg-[#A5282C] text-white hover:bg-[#C64138] transition rounded-full px-2 py-1">
                          {t("clearFilters")}
                        </button>
                      </div>
                    )}
                </div>
                <AnimatePresence>
                  {isFilterSidebarOpen && (
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-neutral-900 p-4 overflow-y-auto"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <button onClick={() => setIsFilterSidebarOpen(false)} className="text-neutral-800 dark:text-neutral-200">
                          <IconX />
                        </button>
                      </div>
                      <FilterContent
                        uniqueCategories={uniqueCategories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedSubcategories={selectedSubcategories}
                        setSelectedSubcategories={setSelectedSubcategories}
                        categoriesMap={categoriesMap}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        computedMinPrice={computedMinPrice}
                        computedMaxPrice={computedMaxPrice}
                        clearFilters={clearFilters}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </div>
        </div>
    </>
  );
}