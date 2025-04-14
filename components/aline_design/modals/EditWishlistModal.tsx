import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";
import { UPDATE_WISHLISTS } from "@/graphql/mutations";

interface EditWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: {
    id: string;
    title: string;
    description?: string;
    due_date?: string;
    require_address?: boolean;
    address?: string;
    type?: string;
  } | null;
  onSuccess: (updatedWishlist: {
    id: string;
    title: string;
    description?: string;
    due_date?: string;
    require_address?: boolean;
    address?: string;
    type?: string;
  }) => void;
}

const EditWishlistModal: React.FC<EditWishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onSuccess,
}) => {
  const t = useTranslations("EditWishlistModal");
  const [updateWishlist, { loading }] = useMutation(UPDATE_WISHLISTS);
  const [formData, setFormData] = useState({
    title: wishlist?.title || "",
    description: wishlist?.description || "",
    due_date: wishlist?.due_date || "",
    require_address: wishlist?.require_address || false,
    address: wishlist?.address || "",
    type: wishlist?.type || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishlist) return;
    
    try {
      const { data } = await updateWishlist({
        variables: {
          id: wishlist.id,
          ...formData,
        },
      });

      if (data?.updateWishlists) {
        onSuccess({
          id: wishlist.id,
          ...formData,
        });
      }
      onClose();
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  if (!isOpen || !wishlist) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{t("editWishlist")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("title")}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6B8A2] focus:ring-[#C6B8A2]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("description")}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6B8A2] focus:ring-[#C6B8A2]"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("dueDate")}
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6B8A2] focus:ring-[#C6B8A2]"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.require_address}
              onChange={(e) =>
                setFormData({ ...formData, require_address: e.target.checked })
              }
              className="h-4 w-4 text-[#C6B8A2] focus:ring-[#C6B8A2] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              {t("requireAddress")}
            </label>
          </div>

          {formData.require_address && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("address")}
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6B8A2] focus:ring-[#C6B8A2]"
                rows={2}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("type")}
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6B8A2] focus:ring-[#C6B8A2]"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#C6B8A2] rounded-md hover:bg-[#C6B8A2]/90 disabled:opacity-50"
            >
              {loading ? t("saving") : t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWishlistModal; 