"use client"
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Card from "@/components/Card";

// Import your GraphQL client and queries
import client from "@/apollo-client";
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";
import GhostButtonWhite from "@/components/GhostButtonWhite";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import Button3 from "@/components/aline_design/Button3";

// Extend the Wishlist interface to include shared_wishlists for filtering
interface SharedWishlist {
  share_token: string | null;
  created_at?: string;
  expires_at?: string;
  wishlist_id?: string;
  id?: string;
}

interface Wishlist {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  due_date?: string;
  type?: string;
  // This field is optional; it should be populated from your GraphQL query
  shared_wishlists?: SharedWishlist[];
}

interface UserData {
  id: string;
  email: string;
  wishlists: Wishlist[];
}

// Helper function to get image URL based on wishlist type
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

const SharedWishlistsPage = () => {
  const t = useTranslations("Dashboard-SharedWishlists");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Starting data fetch...");
        setLoading(true);
        const userEmail = user?.email;
        console.log("User email: ", userEmail);

        if (userEmail) {
          // Fetch user ID by email
          const emailResponse = await client.query({
            query: GET_USERS_BY_EMAIL,
            variables: { email: userEmail },
          });
          const userId = emailResponse.data.usersByEmail?.[0]?.id;
          console.log("Fetched userId: ", userId);

          if (userId) {
            // Then, fetch full user data (including wishlists) by user ID
            const idResponse = await client.query({
              query: GET_USERS_BY_ID,
              variables: { id: userId },
            });
            const userDataById = idResponse.data.userDataById;
            console.log("Fetched user data: ", userDataById);
            if (userDataById) {
              setUserData(userDataById);
            } else {
              console.error("User data not found for ID:", userId);
            }
          }
        } else {
          console.warn("No user email found, skipping data fetch.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
        console.log("Data fetch completed.");
      }
    };

    loadData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <LoadingBox
          imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
          imageAlt="Loading spinner"
          imageClassName=""
          containerClassName="h-[80vh]"
        />
      </div>
    );
  }

  // If no userData is available, log and display a message.
  if (!userData) {
    console.warn("No user data available.");
    return (
      <div className="container mx-auto p-4">
        <p>No data found.</p>
      </div>
    );
  }

  // Extract wishlists from userData and log them.
  const wishlists: Wishlist[] = userData.wishlists || [];
  console.log("Fetched wishlists: ", wishlists);

  // Filter wishlists to include only those with at least one shared_wishlists entry having a non-null share_token.
  const filteredWishlists = wishlists.filter((wishlist) => {
    const hasValidShare =
      wishlist.shared_wishlists &&
      wishlist.shared_wishlists.some((sw) => sw.share_token !== null);
    if (!hasValidShare) {
      console.log(`Excluding wishlist ${wishlist.id} (${wishlist.title}) due to missing share_token.`);
    }
    return hasValidShare;
  });
  console.log("Filtered wishlists with valid share_token: ", filteredWishlists);

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="container mx-auto p-4 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-regular mb-4 md:mb-0">
            {t("sharedWishlists")}
          </h1>
          <button className="w-[80%] md:w-40 bg-transparent border border-[#C6B8A2] rounded-full py-2 text-[#C6B8A2] font-bold hover:bg-[#C6B8A2]/10 transition block text-center">
            <a href="/dashboard/wishlists">
              {t("viewAllLists")}
            </a>
          </button>
        </div>

        <div className="flex flex-row flex-wrap gap-8 justify-center sm:justify-start">
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
    </>
  );
};

export default SharedWishlistsPage;