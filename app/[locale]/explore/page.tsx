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
import { Carousel, Card } from "@/components/aline_design/apple-cards-carousel";


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

const DummyContent = () => {
  const seasonalWishlists = [
    {
      title: "Winter Holidays Wishlist",
      description: "Cozy up with gifts for the winter season: warm blankets, festive mugs, holiday decor, and thoughtful presents for loved ones.",
      img: "/xmas.jpg",
      alt: "Winter holidays gifts"
    },
    {
      title: "Spring Refresh Wishlist",
      description: "Welcome spring with fresh finds: gardening tools, floral decor, outdoor games, and items to refresh your home and wardrobe.",
      img: "/Lists/card1.jpg",
      alt: "Spring wishlist gifts"
    },
    {
      title: "Summer Adventures Wishlist",
      description: "Gear up for summer fun: beach accessories, travel gadgets, picnic sets, and everything you need for sunny adventures.",
      img: "/Lists/card2.jpg",
      alt: "Summer wishlist gifts"
    },
  ];
  return (
    <>
      {seasonalWishlists.map((item, index) => (
        <div
          key={"seasonal-wishlist-" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              {item.title}
            </span>{" "}
            {item.description}
          </p>
          <img
            src={item.img}
            alt={item.alt}
            height="300"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-2xl"
          />
        </div>
      ))}
    </>
  );
};


const data = [
  {
    category: "Winter",
    title: "Winter Holidays Wishlist",
    src: "/xmas.jpg",
    content: (
      <div>
        <p>
          Cozy up with gifts for the winter season: warm blankets, festive mugs, holiday decor, and thoughtful presents for loved ones.
        </p>
        <img
          src="/xmas.jpg"
          alt="Winter holidays gifts"
          className="w-full h-auto rounded-2xl mt-4"
        />
      </div>
    ),
  },
  {
    category: "Spring",
    title: "Spring Refresh Wishlist",
    src: "/Lists/card1.jpg",
    content: (
      <div>
        <p>
          Welcome spring with fresh finds: gardening tools, floral decor, outdoor games, and items to refresh your home and wardrobe.
        </p>
        <img
          src="/Lists/card1.jpg"
          alt="Spring wishlist gifts"
          className="w-full h-auto rounded-2xl mt-4"
        />
      </div>
    ),
  },
  {
    category: "Summer",
    title: "Summer Adventures Wishlist",
    src: "/Lists/card2.jpg",
    content: (
      <div>
        <p>
          Gear up for summer fun: beach accessories, travel gadgets, picnic sets, and everything you need for sunny adventures.
        </p>
        <img
          src="/Lists/card2.jpg"
          alt="Summer wishlist gifts"
          className="w-full h-auto rounded-2xl mt-4"
        />
      </div>
    ),
  },
  {
    category: "Autumn",
    title: "Autumn Cozy Wishlist",
    src: "/Lists/card3.jpg",
    content: (
      <div>
        <p>
          Embrace the fall with cozy sweaters, pumpkin spice treats, home scents, and everything you need for a warm autumn.
        </p>
        <img
          src="/Lists/card3.jpg"
          alt="Autumn wishlist gifts"
          className="w-full h-auto rounded-2xl mt-4"
        />
      </div>
    ),
  },
  {
    category: "Back to School",
    title: "Back to School Wishlist",
    src: "/Lists/card4.jpg",
    content: (
      <div>
        <p>
          Get ready for the new school year: backpacks, stationery, tech gadgets, and essentials for students of all ages.
        </p>
        <img
          src="/Lists/card4.jpg"
          alt="Back to school wishlist gifts"
          className="w-full h-auto rounded-2xl mt-4"
        />
      </div>
    ),
  },
  {
    category: "Valentine's Day",
    title: "Valentine's Day Wishlist",
    src: "/Lists/card5.jpg",
    content: (
      <div>
        <p>
          Celebrate love with romantic gifts: chocolates, flowers, jewelry, and personalized surprises for your special someone.
        </p>
        <img
          src="/Lists/card5.jpg"
          alt="Valentine's Day wishlist gifts"
          className="w-full h-auto rounded-2xl mt-4"
        />
      </div>
    ),
  },
];



export default function Explore() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

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
        <div className="relative  mx-2 sm:mx-10 rounded-3xl overflow-hidden">
          <div className="flex flex-col">
              <div className="container mx-auto px-4 py-8 relative">
                <h1 className="text-4xl font-bold mb-8 text-center">{t("exploreProductsTitle")}</h1>
                <h2 className="text-3xl font-semibold text-center">{t("featuredWishlistsTitle")}</h2>
                <AnimatedLists wishlists={mockWishlists} />
                <div className="flex flex-col my-4 max-w-7xl mx-auto">
                  <h3 className="text-3xl font-semibold text-center">{t("seasonalWishlistsTitle")}</h3>
                  <Carousel items={cards} />
                </div>
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