"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/components/Card"; // Ensure you have this component
// Optionally import any required styling or helper functions

// Define a minimal interface for a Wishlist
interface Wishlist {
  id: string;
  title: string;
  description: string;
  due_date: string;
  type: string;
}

// Mock data for pre-made wishlists
const mockWishlists: Wishlist[] = [
  {
    id: "1",
    title: "Birthday Wishes",
    description: "A collection of birthday gift ideas.",
    due_date: new Date().toISOString(),
    type: "christmas",
  },
  {
    id: "2",
    title: "Holiday Gifts",
    description: "Curated holiday gift ideas.",
    due_date: new Date().toISOString(),
    type: "baby-shower",
  },
];

const getImageForWishlist = (type?: string): string => {
  if (!type) return "/default.jpg";

  switch (type.toLowerCase()) {
    case "christmas":
      return "/xmas.jpg";
    case "baby-shower":
      return "/baby.jpg";
    // add more types as needed
    default:
      return "/create1.png";
  }
};

export default function PreMadeWishlistsPage() {
  const [filteredWishlists, setFilteredWishlists] = useState<Wishlist[]>([]);
  const t = useTranslations("PreMadeWishlist");

  useEffect(() => {
    // Replace this with your query logic later.
    setFilteredWishlists(mockWishlists);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-6">
      <h1 className="text-3xl font-bold mb-6">
        {t("preMadeWishlists") || "Pre-Made Wishlists"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredWishlists.map((wishlist) => (
          <Card
            key={wishlist.id}
            img={getImageForWishlist(wishlist.type)}
            activity={wishlist.title}
            type={wishlist.type || "N/A"}
            date={
              wishlist.due_date
                ? new Date(wishlist.due_date).toLocaleDateString()
                : "N/A"
            }
            postpreview={wishlist.description}
            id={`${wishlist.id}`}
          />
        ))}
        {filteredWishlists.length === 0 && (
          <p className="text-center w-full">No shared wishlists available.</p>
        )}
      </div>
    </div>
  );
}