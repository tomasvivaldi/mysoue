import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    imageUrl: string;
    price: number | null;
    brand?: string;
    additionalDescription?: string;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[5001] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-100 hover:text-gray-200 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative h-64 w-full">
            <Image
              src={product.imageUrl || "/create1.png"}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h2>
          
          {product.price && (
            <p className="text-xl text-gray-600 mb-4">
              <span className="font-semibold">Price: </span>{product.price.toFixed(2)}฿
            </p>
          )}
          
          {product.brand && (
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Brand: </span>{product.brand}
            </p>
          )}
          
          {product.additionalDescription && (
            <p className="text-gray-600 mb-6">{product.additionalDescription}</p>
          )}

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Want to save this product?</h3>
            <p className="text-gray-600 mb-6">
              Create an account to save products to your wishlist and get personalized recommendations.
            </p>
            <Link 
              href="/login" 
              className="block w-full text-center bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 