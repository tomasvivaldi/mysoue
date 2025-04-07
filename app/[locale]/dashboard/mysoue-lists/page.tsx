"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Card from "@/components/Card";
import { GET_PRE_LISTS } from "@/graphql/queries";
import PreListCard from "@/components/cards/PreListCard";
import { AnimatedLists } from "@/components/ui/AnimatedLists";

interface PreList {
  pre_list: string;
}

const getImageForWishlist = (type?: string): string => {
  if (!type) return "/default.jpg";
  switch (type.toLowerCase()) {
    case "christmas":
      return "/xmas.jpg";
    case "baby shower":
      return "/baby.jpg";
    // add more types as needed
    default:
      return "/create1.png";
  }
};

type WishlistItem = {
  title: string;
  description: string;
  link: string;
  src: string;
};

const mysoueListsPage = () => {
  const t = useTranslations("Dashboard-mysoueLists");

  const mockWishlists: WishlistItem[] = [
    {
      title: t("wishlist.baby.title"),
      description: t("wishlist.baby.description"),
      link: "/dashboard/mysoue-lists/Baby%20shower",
      src: "/baby.jpg",
    },
    {
      title: t("wishlist.herBirthday.title"),
      description: t("wishlist.herBirthday.description"),
      link: "/dashboard/mysoue-lists/her-birthday",
      src: "/bday.jpg",
    },
    {
      title: t("wishlist.christmas.title"),
      description: t("wishlist.christmas.description"),
      link: "/dashboard/mysoue-lists/christmas",
      src: "/xmas.jpg",
    },
    {
      title: t("wishlist.hisBirthday.title"),
      description: t("wishlist.hisBirthday.description"),
      link: "/dashboard/mysoue-lists/his-birthday",
      src: "/bg1.jpg",
    },
  ];

  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [preLists, setPreLists] = useState<PreList[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GET_PRE_LISTS,
        });
        setPreLists(data.preLists);
      } catch (error) {
        console.error("Failed to fetch preLists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [client]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const wishlists = preLists.map((item) => {
    const type = item.pre_list;
    return {
      id: type,
      title: type,
      description: `Explore products for ${type}`,
      imageUrl: getImageForWishlist(type),
      type: type,
    };
  });

  const allTypes = ["all"].concat(Array.from(new Set(wishlists.map(item => item.type))));

  const filteredWishlists = activeFilter === "all" 
    ? wishlists 
    : wishlists.filter(wishlist => wishlist.type === activeFilter);

  return (
    <>
      <Head>
        <title>{t("pageTitle") || "MySoue Wishlists"}</title>
      </Head>
      <div className="container mx-auto px-8 mt-8 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-regular">
            {t("mysoueLists") || "MySoue Wishlists"}
          </h1>
        </div>

        {/* Featured Wishlists Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-2">Check out MYSOUE's featured wishlists!</h2>
          <AnimatedLists wishlists={mockWishlists} />
        </div>

        {/* All Wishlists Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-normal mb-6">All Wishlists</h2>
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === type
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "All" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Wishlist cards */}
        <div className="flex flex-row flex-wrap gap-8 justify-center sm:justify-start sm:pl-4 md:pl-0">
          {filteredWishlists.map((wishlist) => (
            <PreListCard  
              id={wishlist.id}
              key={wishlist.id}
              img={wishlist.imageUrl}
              title={wishlist.title}
              description={wishlist.description}
              href={`/dashboard/mysoue-lists/${wishlist.id}`}
            />
          ))}
          {filteredWishlists.length === 0 && (
            <p className="text-center w-full">
              {t("noWishlistsFound") || "No wishlists available for this filter."}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default mysoueListsPage;