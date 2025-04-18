"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface RelatedCategoriesProps {
  currentCategory?: string;
}

const RelatedCategories: React.FC<RelatedCategoriesProps> = ({
  currentCategory,
}) => {
  const t = useTranslations("Explore-ProductPage");
  
  // Mock data for categories - in a real app, this would come from an API
  const categories: Category[] = [
    {
      id: "1",
      name: "Electronics",
      image: "/Product/electronics.jpg",
      description: "Latest gadgets and tech accessories",
    },
    {
      id: "2",
      name: "Fashion",
      image: "/Product/fashion.jpg",
      description: "Trendy clothing and accessories",
    },
    {
      id: "3",
      name: "Home & Living",
      image: "/Product/home.jpg",
      description: "Items to make your home beautiful",
    },
    {
      id: "4",
      name: "Beauty & Wellness",
      image: "/Product/beauty.jpg",
      description: "Products for self-care and wellness",
    },
  ];

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("exploreCategories")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("exploreCategoriesDescription")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              href={`/explore?category=${category.id}`} 
              key={category.id}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#A5282C] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedCategories; 