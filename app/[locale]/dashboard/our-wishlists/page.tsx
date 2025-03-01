"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Card from "@/components/Card";
import { GET_PRE_LISTS } from "@/graphql/queries";

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

const OurWishlistsPage = () => {
  const t = useTranslations("Dashboard-OurWishlists");
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [preLists, setPreLists] = useState<PreList[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GET_PRE_LISTS,
        });
        // data.preLists should be an array of objects with a "pre_list" field.
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

  // Create wishlist-like objects from the preLists
  const wishlists = preLists.map((item) => {
    const type = item.pre_list;
    return {
      id: type, // use pre_list as unique id
      title: type,
      description: `Explore products for ${type}`,
      imageUrl: getImageForWishlist(type),
      type: type,
    };
  });

  return (
    <>
      <Head>
        <title>{t("pageTitle") || "Our Wishlists"}</title>
      </Head>
      <div className="container mx-auto px-4 mt-8 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-regular">
            {t("ourWishlists") || "Our Wishlists"}
          </h1>
          <button className="bg-black text-white px-4 py-2 rounded hover:shadow-lg transition duration-300">
            <a href="/dashboard/create-new-wishlist">
              {t("createNewWishlist") || "Create New Wishlist"}
            </a>
          </button>
        </div>

        <div className="flex flex-row flex-wrap gap-8 justify-center sm:justify-start">
          {wishlists.map((wishlist) => (
            <Card
              key={wishlist.id}
              img={wishlist.imageUrl}
              activity={wishlist.title}
              type={wishlist.type}
              date={""}
              postpreview={wishlist.description}
              id={wishlist.id}
              href={`/dashboard/our-wishlists/${wishlist.id}`}
            />
          ))}
          {wishlists.length === 0 && (
            <p className="text-center w-full">
              {t("noWishlistsFound") || "No wishlists available."}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          {/* Pagination (if needed) */}
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            Previous
          </button>
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            1
          </button>
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            2
          </button>
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default OurWishlistsPage;