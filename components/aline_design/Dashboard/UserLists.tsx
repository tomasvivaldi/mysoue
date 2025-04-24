"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AddWishlistModal from "../modals/AddWishlistModal";
import DeleteWishlistModal from "../modals/DeleteWishlistModal";
import EditWishlistModal from "../modals/EditWishlistModal";
import { useTranslations } from "next-intl"; 
import { useMutation } from "@apollo/client";
import { DELETE_WISHLISTS } from "@/graphql/mutations";
import LoadingBox from "@/components/LoadingBox";

interface Wishlist {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  require_address?: boolean;
  address?: string;
  type?: string;
}

interface UserListsProps {
  wishlists: Wishlist[];
  onEdit: (listId: string) => void;
  onAddNewList: () => void;
  isLoading?: boolean;
}

const UserLists: React.FC<UserListsProps> = ({
  wishlists,
  onEdit,
  onAddNewList,
  isLoading = false,
}) => {
  const t = useTranslations("UserLists");
  const [deleteWishlistMutation, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_WISHLISTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);
  const [localWishlists, setLocalWishlists] = useState<Wishlist[]>(wishlists);
  const PAGE_SIZE = 8;
  const [visibleWishlists, setVisibleWishlists] = useState<Wishlist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Update localWishlists when wishlists prop changes
  useEffect(() => {
    setLocalWishlists(wishlists);
    setCurrentPage(1);
    setVisibleWishlists(wishlists.slice(0, PAGE_SIZE));
  }, [wishlists]);

  // Log when localWishlists changes
  useEffect(() => {
    console.log("localWishlists updated:", localWishlists);
  }, [localWishlists]);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenDeleteModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist);
    setIsDeleteModalOpen(true);
  };

  const handleOpenEditModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist);
    setIsEditModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedWishlist(null);
    setIsDeleteModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setSelectedWishlist(null);
    setIsEditModalOpen(false);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * PAGE_SIZE;
    const newItems = localWishlists.slice(startIndex, startIndex + PAGE_SIZE);
    setVisibleWishlists(prev => [...prev, ...newItems]);
    setCurrentPage(nextPage);
  };
  
  const hasMoreItems = visibleWishlists.length < localWishlists.length;

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

  const handleEditSuccess = (updatedWishlist: Wishlist) => {
    const updatedWishlists = localWishlists.map((wishlist) =>
      wishlist.id === updatedWishlist.id ? updatedWishlist : wishlist
    );
    setLocalWishlists(updatedWishlists);
    setSelectedWishlist(null);
  };

  return (
    <div className="w-full x-paddings rounded-lg mt-8 px-4 sm:px-0">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-black mb-2">{t("yourLists")}</h2>
      <hr className="border-t border-[#C6B8A2] mb-4" />

      {/* Lists */}
      {isLoading ? (
        <div className="py-8">
          <LoadingBox
            imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
            imageAlt="Loading spinner"
            imageClassName=""
            containerClassName="h-[40vh]"
          />
        </div>
      ) : (
        <ul className="space-y-4">
          {visibleWishlists.map((wishlist) => (
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
              <div className="flex space-x-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenEditModal(wishlist);
                  }}
                  className="text-[#C6B8A2] hover:underline transition"
                >
                  {t("edit")}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenDeleteModal(wishlist);
                  }}
                  className="text-[#C6B8A2] hover:underline transition"
                >
                  {t("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
        
      )}

      {hasMoreItems && !isLoading && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleLoadMore}
            disabled={!hasMoreItems}
            className={`my-2 px-4 py-2 rounded-full ${
              hasMoreItems
                ? "bg-[#A5282C] text-white hover:bg-[#C64138] transition"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {hasMoreItems ? t("loadMore") : t("noMoreItems")}
          </button>
        </div>
      )}

      {/* Add New Wishlist Button */}
      <div className="mt-2">
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

      {/* Edit Wishlist Modal */}
      <EditWishlistModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        wishlist={selectedWishlist}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default UserLists;