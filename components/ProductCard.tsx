import Link from "next/link";
import React from "react";

interface ProductCardProps {
  productName: string;
  productDescription: string;
  imageUrl: string;
  wishlistId: string; // Added this prop for linking
  productId: string; // Added this prop for linking
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productDescription,
  imageUrl,
  wishlistId,
  productId,
}) => {
  console.log("Product card - wishlistId", wishlistId);
  console.log("Product card - productId", productId);
  return (
    <Link
      href={`/dashboard/my-wishlists/${wishlistId}/${productId}`} // Updated the dynamic href
      passHref
    >
      <div
        className="border bg-card text-card-foreground w-[300px] lg:w-[350px] rounded-lg overflow-hidden shadow-lg
      transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        data-v0-t="card"
      >
        <img
          src={imageUrl}
          alt="Gift Image"
          className="w-full h-56 object-cover"
          width="350"
          height="350"
          style={{ aspectRatio: "1 / 1", objectFit: "cover" }} // Inline styles can also be converted into a Tailwind equivalent if needed
        />
        <div className="space-y-4 p-4">
          <h3 className="text-lg font-semibold">{productName}</h3>
          <p className="text-sm text-gray-600">{productDescription}</p>
          <div className="flex justify-between">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#e2e8f0] text-black">
              View
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive/90 h-10 px-4 py-2 bg-[#fed7d7] text-black">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
