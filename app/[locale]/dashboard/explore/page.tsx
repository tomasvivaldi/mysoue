"use client";

import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import ProductCard3 from "@/components/cards/ProductCard3";
import { GET_PRODUCTS_LIST } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
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

export default function ProductExplorer() {
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

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange([computedMinPrice, computedMaxPrice]);
    setSortBy("featured");
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
        <title>Product Explorer</title>
      </Head>
      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Explorer</h1>
        <div className="mb-4 pl-4 md:pl-0">
          <button
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className="hover:underline"
          >
            Filters
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="text-sm">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard3
                key={product.id}
                productId={product.id}
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
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="mb-4">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button onClick={clearFilters} className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Clear all filters
            </button>
          </div>
        )}
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
    </>
  );
}