"use client";
import Card from "@/components/Card";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";
import React from "react";
import { User } from "next-auth";
import client from "@/apollo-client";
import { useTranslations } from "next-intl";
import AccountOverview from "@/components/aline_design/Dashboard/AccountOverview";

interface WishlistItem {
  added_at: string;
  additional_description?: string;
  product_id: string;
  quantity: number;
  updated_at: string;
  wishlist_id: string;
  id: string;
}

interface Wishlist {
  address?: string;
  created_at: string;
  description?: string;
  due_date?: string;
  require_address: boolean;
  title: string;
  type: string;
  updated_at: string;
  user_id: string;
  id: string;
  Wishlist_items: WishlistItem[];
}

interface UserById {
  created_at: string;
  email: string;
  id: string;
  oauth_provider: string;
  password_hash: string;
  profile_picture_url: string;
  updated_at: string;
  username: string;
  wishlists: Wishlist[];
}

interface MyWishlistsProps {
  userData: UserById | null; // Assuming UserById is your user data type
}

interface UserWithProvider extends User {
  provider?: string;
}

export default function MyWishlists() {
  const t = useTranslations("Dashboard-MyWishlists");
  const [userData, setUserData] = useState<UserById | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  console.log("session", session);
  console.log("session?.user?.email", user?.email);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const userEmail = user?.email;

        if (userEmail) {
          const emailResponse = await client.query({
            query: GET_USERS_BY_EMAIL,
            variables: { email: userEmail },
          });
          const userId = emailResponse.data.usersByEmail?.[0]?.id;
          console.log("userId", userId);

          if (userId) {
            const idResponse = await client.query({
              query: GET_USERS_BY_ID,
              variables: { id: userId },
            });
            // Adjust this part to match the actual response structure
            const userDataById = idResponse.data.userDataById;
            if (userDataById) {
              setUserData(userDataById);
              console.log("userData set to: ", userDataById);
            } else {
              console.error("User data not found for ID:", userId);
            }
          }
        } else {
          console.log("No user email found, skipping data fetch.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.email]);

  if (loading) {
    // Optional: Render a loading indicator
    return <div>Loading...</div>;
  }

  const wishlists = [
    {
      id: 1,
      title: "Christmas",
      description: "Short List Descriptions",
      imageUrl: "/xmas.jpg",
    },
    {
      id: 2,
      title: "Baby Shower",
      description: "Short List Descriptions",
      imageUrl: "/baby.jpg",
    },
  ];
  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="container mx-auto p-4 x-paddings2">
      <AccountOverview name="Luiza Torrezani" email="test@email.com" />            
      </div>
    </>
  );
}
