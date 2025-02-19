import React, { useState } from "react";
import Link from "next/link";

interface MyGiftCardProps {
  imageSrc: string;
  onReceived: () => void;
  onNotReceived: () => void;
  productId: string;
  received: boolean;
}

const MyGiftCard: React.FC<MyGiftCardProps> = ({
  imageSrc,
  onReceived,
  onNotReceived,
  productId,
  received,
}) => {
  return (
    <div className="flex flex-col items-center bg-[#FBF9F4] rounded-2xl shadow-md p-4 lg:w-64 w-64 sm:w-60 h-fit">
      {/* Gift Image */}
      <div className="w-full h-40 flex items-center justify-center mb-4">
        <img
          src={imageSrc}
          alt="Gift"
          className="object-contain h-full w-auto rounded-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 w-full">
        <Link
          href={`/dashboard/my-gifts/${productId}`}
          passHref
          className="flex justify-center w-full text-[#6D6A65] text-xs xl:text-base border border-[#C6B8A2] py-1 rounded-full font-medium hover:bg-[#C6B8A2]/10 transition"
        >
          CHECK GIFT
        </Link>

        {received ? (
          <span
            onClick={onNotReceived}
            className="flex justify-center w-full text-[#6D6A65] text-xs xl:text-base py-1 rounded-full font-medium transition"
          >
            - GIFT RESERVED -
          </span>
        ) : (
          <span
            onClick={onNotReceived}
            className="flex justify-center w-full text-[#6D6A65] text-xs xl:text-base py-1 rounded-full font-medium transition"
          >
            - GIFT NOT RESERVED YET -
          </span>
        )}
      </div>
    </div>
  );
};

export default MyGiftCard;