import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface FilterContentProps {
    uniqueCategories: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    selectedSubcategories: string[];
    setSelectedSubcategories: React.Dispatch<React.SetStateAction<string[]>>;
    categoriesMap: Record<string, string[]>;
    priceRange: [number, number];
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    computedMinPrice: number;
    computedMaxPrice: number;
    clearFilters: () => void;
  }
  
  export function FilterContent({
    uniqueCategories,
    selectedCategories,
    setSelectedCategories,
    selectedSubcategories,
    setSelectedSubcategories,
    categoriesMap,
    priceRange,
    setPriceRange,
    computedMinPrice,
    computedMaxPrice,
    clearFilters,
  }: FilterContentProps) {
    const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  
    const toggleAccordion = (category: string) => {
      if (openAccordions.includes(category)) {
        setOpenAccordions(openAccordions.filter((c) => c !== category));
      } else {
        setOpenAccordions([...openAccordions, category]);
      }
    };
  
    const toggleCategory = (category: string) => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories((prev) => prev.filter((c) => c !== category));
        setSelectedSubcategories((prev) =>
          prev.filter((subcat) => !(categoriesMap[category]?.includes(subcat)))
        );
      } else {
        setSelectedCategories((prev) => [...prev, category]);
      }
    };
  
    const toggleSubcategory = (subcat: string, parentCategory: string) => {
      if (selectedSubcategories.includes(subcat)) {
        setSelectedSubcategories((prev) => prev.filter((s) => s !== subcat));
      } else {
        setSelectedSubcategories((prev) => [...prev, subcat]);
        if (!selectedCategories.includes(parentCategory)) {
          setSelectedCategories((prev) => [...prev, parentCategory]);
        }
      }
    };
  
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    };
  
    return (
      <div className="px-4 py-2">
        <div className="mb-4">
          <h4 className="font-medium text-lg mb-2">Categories</h4>
          <div className="space-y-4">
            {uniqueCategories.map((cat) => (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${cat}`}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${cat}`} className="text-sm">
                      {cat}
                    </label>
                  </div>
                  <button onClick={() => toggleAccordion(cat)} className="focus:outline-none">
                    {openAccordions.includes(cat) ? (
                      <IconChevronUp size={16} />
                    ) : (
                      <IconChevronDown size={16} />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {openAccordions.includes(cat) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 space-y-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {categoriesMap[cat]?.map((subcat) => (
                        <div key={subcat} className="flex items-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            id={`subcategory-${cat}-${subcat}`}
                            checked={selectedSubcategories.includes(subcat)}
                            onChange={() => toggleSubcategory(subcat, cat)}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`subcategory-${cat}-${subcat}`}
                            className="text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {subcat}
                          </label>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-medium text-lg mb-2">Price Range</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              min={computedMinPrice}
              max={priceRange[1]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-20 p-1 border rounded-md"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              max={computedMaxPrice}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-20 p-1 border rounded-md"
            />
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button onClick={clearFilters} className="text-sm underline">
            Clear all filters
          </button>
        </div>
      </div>
    );
  }