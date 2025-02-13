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
import UserLists from "@/components/aline_design/Dashboard/UserLists";
import LoadingBox from "@/components/LoadingBox";

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

        ///// check if redux store is empty -> if yes: load and dispatch data | if no: dont do anything

        /// if (reduxData) -> load data
        ///  break
        ////// else -> run code below

        ///// when make changes on database also change redux data store     


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

              ////// Dispatch to redux /////////

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

  if (loading)    { 
    return     <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />;
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
      <div className="container mx-auto p-4 ">
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-regular font-simplemichael">
            {t("title")}
          </h1>
          <button className="bg-black text-white px-4 py-2 rounded hover:shadow-lg transition duration-300">
            <a href="/dashboard/create-new-wishlist" className=" font-nunito">
              {t("createNewWishlistButton")}
            </a>
          </button>
        </div> */}

        <div className="flex flex-row flex-wrap gap-8 justify-center sm:justify-start">
          {/* {userData?.wishlists.map((wishlist) => {
            // Only attempt to create a Date object if wishlist.due_date is defined
            const readableDate = wishlist.due_date
              ? new Date(wishlist.due_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "none";
            console.log("wishlist", wishlist);
            return (
              <Card
                key={wishlist?.id}
                id={wishlist?.id}
                img="/xmas.jpg" // fix this to dinamically match image to list type
                activity={wishlist.title}
                type={wishlist.type}
                date={readableDate} // Use the formatted date or "none"
                postpreview={wishlist?.description!}
              />
            );
          })} */}
          <UserLists
            wishlists={userData?.wishlists || []}
            onEdit={(id) => console.log(`Edit wishlist with id: ${id}`)}
            onAddNewList={() => console.log("Add a new wishlist")}
          />
        </div>

      </div>
    </>
  );
}

// "use client";

// import UserLists from "@/components/aline_design/Dashboard/UserLists";
// import React from "react";


// export default function UserListsPage() {
//   // Example lists
//   const lists = [
//     { name: "Birthday" },
//     { name: "Valentine" },
//     { name: "Graduation" },
//   ];

//   const handleEditList = (listName: string) => {
//     alert(`Edit ${listName}`);
//   };

//   const handleAddNewList = () => {
//     alert("Add New Wishlist");
//   };

//   return (
//     <div className="min-h-screen w-full x-paddings flex py-20 justify-center bg-white">
//       <UserLists
//         lists={lists}
//         onEdit={handleEditList}
//         onAddNewList={handleAddNewList}
//       />
//     </div>
//   );
// }