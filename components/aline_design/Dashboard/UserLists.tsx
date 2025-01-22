"use client";

import Link from "next/link";
import { useState } from "react";
import AddWishlistModal from "../modals/AddWishlistModal";

interface Wishlist {
  id: string;
  title: string;
}

interface UserListsProps {
  wishlists: Wishlist[];
  onEdit: (listId: string) => void;
  onAddNewList: () => void;
}

const UserLists: React.FC<UserListsProps> = ({
  wishlists,
  onEdit,
  onAddNewList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  
  return (
    <div className="bg-white w-full rounded-lg">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-black mb-4">YOUR LISTS</h2>
      <hr className="border-t border-[#C6B8A2] mb-6" />

      {/* Lists */}
      <ul className="space-y-4">
        {wishlists.map((wishlist) => (
          <li
            key={wishlist.id}
            className="group flex items-center justify-between text-black text-sm px-4 py-2
                       transition-all duration-300 ease-in-out hover:shadow-lg rounded-xl"
          >
            <Link
              href={`/dashboard/my-wishlists/${wishlist.id}`}
              passHref
              className="flex-grow font-semibold text-xl hover:underline"
            >
              {wishlist.title}
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when "edit" is clicked
                onEdit(wishlist.id);
              }}
              className="text-[#C6B8A2] hover:underline transition"
            >
              edit
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Wishlist Button */}
      <div className="mt-8">
        <button
          onClick={handleOpenModal}
          className="w-full bg-transparent border border-[#C6B8A2] rounded-full py-2 text-[#C6B8A2] font-bold hover:bg-[#C6B8A2]/10 transition block text-center"
        >
          ADD NEW WISHLIST
        </button>
      </div>
      {/* Render the modal */}
      <AddWishlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
      />
    </div>
  );
};

export default UserLists;