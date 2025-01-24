import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productName: string, productDescription: string) => void;
}

const AddProductModal: React.FC<ModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");

  const handleAddProduct = () => {
    if (productName.trim() && productDescription.trim()) {
      onAddProduct(productName, productDescription);
      setProductName(""); // Clear the input fields after submission
      setProductDescription("");
      onClose(); // Close the modal
    } else {
      alert("Please fill out both fields.");
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-[#FDF4E5] rounded-lg shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-6">ADD NEW PRODUCT</h2>
          <p className="text-base text-gray-700 mb-8">
            Provide the details for the product you'd like to add to your wishlist.
          </p>

          {/* Product Name Input */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#A5282C] outline-none"
            />

            {/* Product Description Input */}
            <textarea
              placeholder="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#A5282C] outline-none"
            />

            {/* Add Product Button */}
            <button
              onClick={handleAddProduct}
              className="w-fit mx-auto bg-[#A5282C] text-white py-2 px-8 rounded-full font-medium hover:bg-[#C64138] transition"
            >
              ADD
            </button>

            {/* Go Back Button */}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;