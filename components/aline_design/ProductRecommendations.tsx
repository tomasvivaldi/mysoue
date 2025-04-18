"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ProductCard2 from "../cards/ProductCard2";

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  image_url: string;
  price: number;
}

interface ProductRecommendationsProps {
  currentProductId: string;
  category?: string;
  subcategory?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProductId,
  category,
  subcategory,
}) => {
  const t = useTranslations("Explore-ProductPage");
  
  // This would typically come from an API call based on the current product's category/subcategory
  // For now, we'll use mock data
  const mockRecommendations: Product[] = [
    {
      id: "1",
      product_name: "Luxury Watch",
      product_description: "Elegant timepiece with premium materials",
      image_url: "/Product/watch.jpg",
      price: 299.99,
    },
    {
      id: "2",
      product_name: "Designer Handbag",
      product_description: "Stylish accessory for any occasion",
      image_url: "/Product/bag.jpg",
      price: 199.99,
    },
    {
      id: "3",
      product_name: "Premium Headphones",
      product_description: "High-quality sound with noise cancellation",
      image_url: "/Product/headphones.jpg",
      price: 249.99,
    },
    {
      id: "4",
      product_name: "Smart Fitness Tracker",
      product_description: "Track your health and fitness goals",
      image_url: "/Product/fitness.jpg",
      price: 149.99,
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("recommendedProducts")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("recommendedProductsDescription")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockRecommendations.map((product) => (
            <ProductCard2
              key={product.id}
              href={`/explore/${product.id}`}
              imageUrl={product.image_url}
              name={product.product_name}
              price={product.price}
              status="unreserved"
              additionalDescription={product.product_description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations; 