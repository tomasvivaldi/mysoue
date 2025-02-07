"use client";

import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import client from "@/apollo-client";
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";
import AccountOverview from "@/components/aline_design/Dashboard/AccountOverview";

interface UserById {
  id: string;
  email: string;
  username: string;
  profile_picture_url: string;
  wishlists: any[]; // Adjust type as needed
}

export default function MyWishlists() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserById | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        if (session?.user?.email) {
          // Fetch user by email
          const emailResponse = await client.query({
            query: GET_USERS_BY_EMAIL,
            variables: { email: session.user.email },
          });

          const userId = emailResponse.data.usersByEmail?.[0]?.id;

          if (userId) {
            // Fetch user details by ID
            const idResponse = await client.query({
              query: GET_USERS_BY_ID,
              variables: { id: userId },
            });

            const userData = idResponse.data.userDataById;
            if (userData) {
              setUserData({
                id: userData.id,
                email: userData.email,
                username: userData.username || "Unnamed User",
                profile_picture_url: userData.profile_picture_url || "",
                wishlists: userData.wishlists || [],
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <div className="container mx-auto my-8 sm:px-4 x-paddings">
        <AccountOverview name={userData.username} email={userData.email} />
      </div>
    </>
  );
}