import React from "react";
import { Button2 } from "./buttons/Button2";
import GhostButtonBlack from "./GhostButtonBlack";
import SolidButtonBlack from "./SolidButtonBlack";
// import { useRouter } from "next/router";

const ConfirmationStep: React.FC = () => {
  //   const router = useRouter();

  //   const handleCheckWishlists = () => {
  //     router.push("/dashboard/my-wishlists");
  //   };

  //   const handleBackToLists = () => {
  //     router.push("/dashboard/our-lists");
  //   };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full w-full">
      <div className="rounded-md border-gray-200 bg-[#fbf9f4] px-4 md:px-12 py-8 w-[90%] sm:w-[80%] lg:w-[50%] mx-auto shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">List Added Successfully</h2>
        <p className="text-gray-600 mb-8">
          This list was added successfully to MySoue Wishlists
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/dashboard/my-wishlists">
            <SolidButtonBlack text="Back to your lists" />
          </a>
          <a href="/dashboard/mysoue-lists">
            <GhostButtonBlack text="Check MySoue Wishlists" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
