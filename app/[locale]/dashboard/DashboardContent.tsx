"use client";

import React from "react";
import { useTranslations } from "next-intl";

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

interface DashboardContentProps {
  userData: UserById;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ userData }) => {
  const t = useTranslations("DashboardMobileNavbar");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("welcome")}, {userData.username}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.wishlists.map((wishlist) => (
          <div key={wishlist.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{wishlist.title}</h2>
            <p className="text-gray-600 mb-4">{wishlist.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {wishlist.Wishlist_items.length} {t("items")}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(wishlist.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent; 