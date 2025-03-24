import React from "react";
import { useTranslations } from "next-intl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productData: {
    product_name: string;
    product_description: string;
    price: number;
    image_url: string;
    category: string;
    brand: string;
    store_link: string;
  }) => Promise<void>;
}

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Toys & Games",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books",
  "Automotive",
  "Health & Wellness",
  "Online Product",
];

const AddProductModal: React.FC<ModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const t = useTranslations("AddProductModal");
  
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [price, setPrice] = React.useState<number | "">("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [category, setCategory] = React.useState(categories[0]); // Default to first category
  const [brand, setBrand] = React.useState("");
  const [storeLink, setStoreLink] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleAddProduct = async () => {
    if (!productName.trim() || !productDescription.trim() || price === "") {
      alert(t("fill_required_fields"));
      return;
    }
    setIsLoading(true);
    try {
      await onAddProduct({
        product_name: productName,
        product_description: productDescription,
        price: Number(price),
        image_url: imageUrl,
        category,
        brand,
        store_link: storeLink,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error adding product", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProductName("");
    setProductDescription("");
    setPrice("");
    setImageUrl("");
    setCategory(categories[0]);
    setBrand("");
    setStoreLink("");
    setIsSuccess(false);
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-[#FDF4E5] rounded-lg shadow-lg p-8 max-h-[80vh] overflow-y-scroll">
        {/* Close Button */}
        <button
          onClick={() => {
            console.log('AddProductModal: Modal closed by user.');
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-6">
            {t("add_new_product")}
          </h2>

          <div className="flex flex-col gap-4">
            <fieldset disabled={isSuccess} className="flex flex-col gap-4">
              {/* Product Name */}
              <input
                type="text"
                placeholder={t("product_name_placeholder")}
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Product Description */}
              <textarea
                placeholder={t("product_description_placeholder")}
                value={productDescription}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Price */}
              <input
                type="number"
                placeholder={t("price_placeholder")}
                value={price}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : "";
                  setPrice(val);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Image URL */}
              <input
                type="text"
                placeholder={t("image_url_placeholder")}
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Category Dropdown */}
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Brand */}
              <input
                type="text"
                placeholder={t("brand_placeholder")}
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Store Link */}
              <input
                type="text"
                placeholder={t("store_link_placeholder")}
                value={storeLink}
                onChange={(e) => {
                  setStoreLink(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </fieldset>

            {/* Add Product Button */}
            <button
              onClick={handleAddProduct}
              disabled={isLoading || isSuccess}
              className="w-fit mx-auto bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
            >
              {isLoading ? t("loading") : isSuccess ? t("product_added") : t("add_product")}
            </button>

            {/* Add Another Product Button */}
            {isSuccess && (
              <button
                onClick={handleReset}
                className="w-fit mx-auto border border-[#A5282C] text-gray-700 py-2 px-8 rounded-full font-medium hover:bg-white/70 transition"
              >
                {t("add_another_product")}
              </button>
            )}

            {/* Go Back Button */}
            <button
              onClick={() => {
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              {t("go_back")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;