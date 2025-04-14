"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import HeroBanner3 from "@/components/aline_design/HeroBanner3";
import SolidButton from "@/components/buttons/SolidButton";
import { FocusCards } from "@/components/aline_design/FocusCards";
import { FloatingButton } from "@/components/ui/FloatingButton";
import client from "@/apollo-client";
import { GET_UNIQUE_PRE_LISTS } from "@/graphql/queries";
import LoadingBox from "@/components/LoadingBox";

interface PreList {
  pre_list: string;
  count: number;
  image_url: string;
}

const Lists = () => {
  const t = useTranslations("ListsPage");
  const router = useRouter();
  const [preLists, setPreLists] = useState<PreList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation settings
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    const fetchPreLists = async () => {
      try {
        setLoading(true);
        const response = await client.query({
          query: GET_UNIQUE_PRE_LISTS,
        });
        
        const data = response?.data?.uniquePreLists || [];
        setPreLists(data);
      } catch (error) {
        console.error("Failed to fetch pre-made lists:", error);
        setError("Failed to load pre-made lists");
      } finally {
        setLoading(false);
      }
    };

    fetchPreLists();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>

      <SolidButton 
        text="Start Now" 
        href="/login" 
        className="text-xl px-12 py-4 mx-10 my-4 bg-[#FFF9E8] text-black hover:text-white hover:bg-[#A5282C]" 
      />
      <FloatingButton/>

      <HeroBanner3
        backgroundImage="/Lists/bg.jpg"
        headingText={t("heroMain")}
        italicText={t("heroItalic")}
        textColor="text-[#fff] text-shadow"
      />

      <div className="flex flex-col p-4 x-paddings items-center sm:mb-20">
        <div className="text-center w-[95%] mx-auto mt-10 rounded-3xl">
          <motion.h2
            variants={fadeIn}
            className="heading2 mb-4 font-simplemichael"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {t("needInspiration")}
          </motion.h2>

          <p className="text-base leading-relaxed text-gray-600 w-[80%] sm:max-w-6xl lg:max-w-7xl text-justify mx-auto whitespace-pre-line">
            {t("introParagraph")}
          </p>
        </div>

        {loading ? (
          <div className="w-full my-14">
            <LoadingBox
              imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
              imageAlt="Loading spinner"
              imageClassName=""
              containerClassName="h-[200px] md:h-[450px]"
            />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center w-full h-[50vh]">
            <p className="text-xl text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            {/* Pre-made lists */}
            <div className="order-2 sm:order-1 z-20 my-14 flex flex-col md:flex-row gap-[15px] sm:gap-6 flex-nowrap">
              {preLists.map((list) => (
                <button
                  key={list.pre_list}
                  onClick={() => router.push(`/lists/${list.pre_list}`)}
                  className="px-6 py-2 border border-black hover:bg-[#FFF9E8] rounded-full mx-3 uppercase text-xs tracking-widest text-black bg-transparent"
                >
                  {list.pre_list}
                </button>
              ))}
            </div>

            {/* FocusCards component */}
            <div className="sm:order-2 order-1 w-full h-fit">
              <FocusCards 
                cards={preLists.map(list => ({
                  title: list.pre_list,
                  src: list.image_url || "/Lists/card1.jpg"
                }))} 
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Lists;