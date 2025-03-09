// /components/WishlistsFeatures.tsx
"use client";

import React from "react";
import {
  GiftIcon,
  LinkIcon,
  LockClosedIcon,
  SparklesIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const WishlistsFeatures: React.FC = () => {
  return (
    <section className="w-full max-w-6xl px-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* 1. Wishlists for every occasion */}
        <div className="flex flex-col items-center">
          <GiftIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Wishlists for every occasion</h3>
          <p className="text-sm text-gray-600">
            You can create multiple wishlists: Birthday, Christmas, Wedding, etc. 
            You can even have more than one wishlist for the same occasion—one for friends, another for family.
          </p>
        </div>

        {/* 2. Share via direct link */}
        <div className="flex flex-col items-center">
          <LinkIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Share via direct link</h3>
          <p className="text-sm text-gray-600">
            You can share your wishlist’s direct link with friends, and at any time, 
            you can change who can view it by adjusting the permissions.
          </p>
        </div>

        {/* 3. Secret wishlists */}
        <div className="flex flex-col items-center">
          <LockClosedIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secret wishlists</h3>
          <p className="text-sm text-gray-600">
            You can keep wishlists private—only you have access. 
            If you share them, you can temporarily make them public and then switch them back to private.
          </p>
        </div>

        {/* 4. Sorting by level of interest */}
        <div className="flex flex-col items-center">
          <SparklesIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Sorting by level of interest</h3>
          <p className="text-sm text-gray-600">
            You decide which products appear first in your wishlists. 
            This helps people know which items you want the most.
          </p>
        </div>

        {/* 5. Detailed information for each product */}
        <div className="flex flex-col items-center">
          <InformationCircleIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Detailed information for each product</h3>
          <p className="text-sm text-gray-600">
            You can view images, descriptions, and even add notes 
            to each product in your wishlist.
          </p>
        </div>

        {/* 6. Confidential information */}
        <div className="flex flex-col items-center">
          <ShieldCheckIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Confidential information</h3>
          <p className="text-sm text-gray-600">
            All data in our system is encrypted. Your personal information is kept private and secure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WishlistsFeatures;