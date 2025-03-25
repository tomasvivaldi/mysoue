"use client";

import Link from "next/link";
import { useState } from "react";
import AddWishlistModal from "../modals/AddWishlistModal";
import DeleteWishlistModal from "../modals/DeleteWishlistModal";
import { useTranslations } from "next-intl"; 
import { useMutation } from "@apollo/client";
import { DELETE_WISHLISTS } from "@/graphql/mutations";

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
  const t = useTranslations("UserLists");
  const [deleteWishlistMutation, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_WISHLISTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);
  const [localWishlists, setLocalWishlists] = useState<Wishlist[]>(wishlists);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenDeleteModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedWishlist(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteWishlist = async () => {
    if (!selectedWishlist) return;
    try {
      await deleteWishlistMutation({ variables: { id: selectedWishlist.id } });
      console.log(`Wishlist with ID: ${selectedWishlist.id} deleted successfully.`);
      // Update the local state by filtering out the deleted wishlist
      const updatedWishlists = localWishlists.filter(
        (wishlist) => wishlist.id !== selectedWishlist.id
      );
      setLocalWishlists(updatedWishlists);
      console.log("Updated local wishlists:", updatedWishlists);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting wishlist:", error);
    }
  };

  return (
    <div className="w-full x-paddings rounded-lg mt-8 px-4 sm:px-0">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-black mb-2">{t("yourLists")}</h2>
      <hr className="border-t border-[#C6B8A2] mb-6" />

      {/* Lists */}
      <ul className="space-y-4">
  {localWishlists.map((wishlist) => (
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
          e.preventDefault(); // Prevent navigation when "delete" is clicked
          handleOpenDeleteModal(wishlist);
        }}
        className="text-[#C6B8A2] hover:underline transition"
      >
        {t("delete")}
      </button>
    </li>
  ))}
</ul>

      {/* Add New Wishlist Button */}
      <div className="mt-8">
        <button
          onClick={handleOpenAddModal}
          className="w-full bg-transparent border border-[#C6B8A2] rounded-full py-2 text-[#C6B8A2] font-bold hover:bg-[#C6B8A2]/10 transition block text-center"
        >
          {t("addNewWishlist")}
        </button>
      </div>

      {/* Add Wishlist Modal */}
      <AddWishlistModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Delete Wishlist Modal */}
      <DeleteWishlistModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteWishlist}
        wishlistTitle={selectedWishlist?.title}
      />
    </div>
  );
};

export default UserLists;