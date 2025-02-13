"use client";

import React, { useEffect, useState } from "react";
import client from "@/apollo-client";
import MyGiftCard from "@/components/aline_design/Dashboard/MyGiftCard";
import { GET_WISHLIST_BY_ID } from "@/graphql/queries"; // Adjust the query if necessary
import { useSession } from "next-auth/react";
import LoadingBox from "@/components/LoadingBox";

interface Gift {
  id: string;
  product_name: string;
  product_description: string;
  image_url: string;
  received: boolean;
  wishlist_id: string;
}

const MyGifts: React.FC = () => {
  const { data: session } = useSession();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);

        if (session?.user?.email) {
          const response = await client.query({
            query: GET_WISHLIST_BY_ID, // Adjust the query as needed for fetching gifts
            variables: { id: 3 }, // Replace with dynamic ID or another variable
          });
          setGifts(response?.data?.wishlistsById[0]?.wishlist_items || []);
        }
      } catch (error) {
        console.error("Failed to fetch gifts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGifts();
  }, [session?.user?.email]);

  if (loading) { return       <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />;
    }

  return (
    <div className="my-8 flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="heading2 px-8">My Gifts</h1>
      </div>
      <div className="flex flex-col sm:flex-row h-screen overflow-scroll w-fit mx-auto gap-4 flex-wrap">
        {gifts.map((gift: Gift) => (
          <MyGiftCard
            key={gift.id}
            imageSrc={gift.image_url || "/create1.png"}
            onReceived={() => console.log(`Gift ${gift.id} marked as received`)}
            onNotReceived={() =>
              console.log(`Gift ${gift.id} marked as not received`)
            }
          />
        ))}
      </div>
      {gifts.length === 0 && (
        <p className="text-center text-gray-600">
          You haven't received any gifts yet.
        </p>
      )}
    </div>
  );
};

export default MyGifts;