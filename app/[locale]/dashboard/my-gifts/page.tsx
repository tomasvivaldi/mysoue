"use client";

import React, { useEffect, useState } from "react";
import client from "@/apollo-client";
import MyGiftCard from "@/components/aline_design/Dashboard/MyGiftCard";
import { GET_WISHLIST_BY_ID } from "@/graphql/queries";
import { useSession } from "next-auth/react";
import LoadingBox from "@/components/LoadingBox";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("MyGifts");

  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);

        if (session?.user?.email) {
          const response = await client.query({
            query: GET_WISHLIST_BY_ID,
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

  if (loading) {
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );
  }

  const reservedGifts = gifts.filter((gift) => gift.received);
  const nonReservedGifts = gifts.filter((gift) => !gift.received);

  return (
    <div className="my-8 flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="heading2 px-8">{t("myGifts")}</h1>
      </div>

      {/* Reserved Gifts Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 px-8">{t("reservedGifts")}</h2>
        <div className="flex flex-col sm:flex-row h-fit overflow-scroll w-fit mx-auto gap-4 flex-wrap">
          {reservedGifts.length > 0 ? (
            reservedGifts.map((gift) => (
              <MyGiftCard
                key={gift.id}
                imageSrc={gift.image_url || "https://dl.dropboxusercontent.com/scl/fi/t89ci7e739vvyfk3jkrz7/tutti-bambini-cozee-2.png?rlkey=nxma4mv18sybo4sy0jvkcetdu&st=hfbwngod" || "/create1.png"}
                onReceived={() => console.log(`Gift ${gift.id} marked as received`)}
                onNotReceived={() => console.log(`Gift ${gift.id} marked as not received`)}
                productId={gift.id}
                received={gift.received}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 px-8">{t("noReservedGifts")}</p>
          )}
        </div>
      </div>

      {/* Non-Reserved Gifts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 px-8">{t("nonReservedGifts")}</h2>
        <div className="flex flex-col sm:flex-row h-fit overflow-scroll w-fit mx-auto gap-4 flex-wrap">
          {nonReservedGifts.length > 0 ? (
            nonReservedGifts.map((gift) => (
              <MyGiftCard
                key={gift.id}
                imageSrc={gift.image_url || "https://dl.dropboxusercontent.com/scl/fi/t89ci7e739vvyfk3jkrz7/tutti-bambini-cozee-2.png?rlkey=nxma4mv18sybo4sy0jvkcetdu&st=hfbwngod" || "/create1.png"}
                onReceived={() => console.log(`Gift ${gift.id} marked as received`)}
                onNotReceived={() => console.log(`Gift ${gift.id} marked as not received`)}
                productId={gift.id}
                received={gift.received}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 px-8">{t("allGiftsReserved")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGifts;