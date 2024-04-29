import React from "react";
import Image from "next/image";
import HeroCard from "./HeroCard";
import GhostButtonBlack from "./GhostButtonBlack";
import { SmallTextBanner } from "./banners/SmallTextBanner";
import GiftStack from "./GiftStack";

const AllAboutGifts = () => {
  return (
    <div key="1" className="  bg-[#fff8e9]">
      <SmallTextBanner
        items={[
          "WE GOT IT",
          "WE GOT IT",
          "WE GOT IT",
          "WE GOT IT",
          "WE GOT IT",
        ]} // Array length for repetition
        extraWord="Creativity"
        genericText="you want it"
        textColor="#b91c1c"
        bgColor=""
        direction="left"
        speed="slow"
        className="border border-b-[#B72228] border-t-[#B72228] mt-36 my-12 py-4 text-4xl tracking-[0.2em] font-inter"
      />
      <div className="w-full flex flex-col lg:flex-row justify-around p-8 x-paddings">
        {/* <h1 className="font-semibold heading2 text-center mb-2 -mt-6">
            We are all about gift
          </h1> */}
        <Image
          alt="Gift with ribbon"
          className="mb-10 lg:mb-4 rounded-lg object-cover mx-auto  w-[80%] lg:w-[45%] h-[600px]"
          height="300"
          src="/gift1.webp"
          style={{
            aspectRatio: "520/300",
            objectFit: "cover",
          }}
          width="520"
        />
        <div className="flex flex-col gap-8 w-full md:w-[50%] mx-auto">
          <div className="  flex flex-col gap-6 justify-center text-center">
            {/* <p className="text-gray-700 text-lg mb-4">
              At mysoue, we reimagine the gift-giving experience, turning
              special occasions into unforgettable moments. Going beyond
              conventional wish lists, we serve as a hub that synchronizes your
              wishlist dreams by transforming the thoughtfulness of your lovers
              into carefully curated gifts.
            </p> */}
            <h1 className="font-simplemichael text-4xl font-thin">
              We are all about gifts - You want it? We got it.
            </h1>
            <p className="font-nunito text-gray-700">
              At <strong>MYSOUE</strong>, we reimagine the gift-giving
              experience. Celebrate special occasions and share with your loved
              ones the items you dream of.
            </p>
            <p className="font-nunito text-gray-700">
              For every occasion, we transform your wishes into curated lists.
            </p>
            <p className="font-nunito text-gray-700">
              Select, combine, create.
            </p>
          </div>
          <GiftStack />
          {/* <div className="mx-auto ">
            <GhostButtonBlack text="Create Your List" />
          </div> */}
          {/* <div className="w-full md:w-[60%] gap-4 flex flex-row justify-between overflow-x-scroll sm:overflow-x-auto">
            <HeroCard
              title="Christmas"
              imagePath="/xmas.jpg" // Replace with the actual path to your image
            />
            <HeroCard
              title="Christmas"
              imagePath="/xmas.jpg" // Replace with the actual path to your image
            />
            <HeroCard
              title="Christmas"
              imagePath="/xmas.jpg" // Replace with the actual path to your image
            />
          </div> */}
        </div>
      </div>
      <SmallTextBanner
        items={[
          "Occasions",
          "Lifestyles",
          "Wishes",
          "Ages",
          "Occasions",
          "Lifestyles",
          "Wishes",
          "Ages",
        ]} // Array length for repetition
        extraWord="Creativity"
        genericText="FOR ALL"
        textColor="#FFFFFF"
        bgColor=""
        direction="left"
        speed="slow"
        className="bg-[#B72228] mt-4 translate-y-[50%] text-xs tracking-[0.2em] font-light"
      />
    </div>
  );
};

export default AllAboutGifts;
