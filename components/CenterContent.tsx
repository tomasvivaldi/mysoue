// components/CenterContent.tsx

import React from "react";
import GhostButtonBlack from "./GhostButtonBlack";

const CenterContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-28 bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center heading2 text-gray-900 ">
            Your Wishlist, Your Way
          </h2>
          <p className="pt-2 text-center text-base font-light text-gray-600 mt-4 min-w-xl max-w-2xl mx-auto">
            MYSOUE Is More Than Just A Platform; It's A Community Where
            Preferences Are Respected, And Choices Are Celebrated. Creating A
            Wishlist With Us Is Not Just Convenient But Also A Delightful
            Experience, Ensuring That Every Gift You Receive Is A Wish Granted.
          </p>
        </div>
        <div className="w-fit mx-auto">
          <GhostButtonBlack text={"Create An Account"} />
        </div>
      </div>
    </div>
  );
};

export default CenterContent;
