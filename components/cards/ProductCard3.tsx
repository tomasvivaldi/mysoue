import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductModal from "../modals/ProductModal";

interface ProductCard3Props {
  href: string;
  preList: string;
  imageUrl: string;
  name: string;
  price: number | null;
  additionalDescription?: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  modal?: boolean;
}

const ProductCard3: React.FC<ProductCard3Props> = ({
  href,
  preList,
  imageUrl,
  name,
  price,
  additionalDescription,
  brand,
  category,
  subcategory,
  modal = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Provide a fallback image URL if imageUrl is null or empty
  const safeImageUrl = imageUrl || "/create1.png";

  const handleCardClick = (e: React.MouseEvent) => {
    if (modal) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Link href={href} passHref key={href} onClick={handleCardClick}>
        <div className="bg-white h-fit rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <div className="relative h-48 w-full">
            <Image
              src={safeImageUrl}
              alt={name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4 max-h-[150px] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 ">
              {name || "Unnamed Product"}
            </h2>
            {price && price !== null && (
              <p className="text-md text-gray-600 ">
                <span className="font-semibold">Price: </span>{price.toFixed(2)}฿
              </p>
            )}
            {brand && <p className="text-sm text-gray-600 "><span className="font-semibold">Brand: </span> {brand}</p>}
            {/* {category && <p className="text-sm text-gray-600">Category: {category}</p>}
            {subcategory && <p className="text-sm text-gray-600">Subcategory: {subcategory}</p>} */}
            {additionalDescription && (
              <p className="text-sm text-gray-600 overflow-y-auto ">
                {additionalDescription}
              </p>
            )}
          </div>
        </div>
      </Link>

      {modal && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={{
            name,
            imageUrl: safeImageUrl,
            price,
            brand,
            additionalDescription
          }}
        />
      )}
    </>
  );
};

export default ProductCard3;