"use client";

import { useState, FC } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  categories: {
    id: string;
    name: string;
    products: {
      id: string;
      name: string;
      description: string | null;
      price: string | null;
      usagePeriod: string | null;
    }[];
    sameIndustryProducts: {
      id: string;
      name: string;
      description: string | null;
      price: string | null;
      usagePeriod: string | null;
    }[];
  }[];
}

const ProductList: FC<Props> = ({ categories }) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };
  console.log(categories);
  return (
    <div>
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <button
            onClick={() => toggleCategory(category.name)}
            className="flex justify-between items-center w-full p-4 bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg"
          >
            <span className="text-lg font-semibold">{category.name}</span>
            {openCategories.includes(category.name) ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </button>

          {openCategories.includes(category.name) && (
            <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
              {category.sameIndustryProducts.map((product) => (
                <div key={product.name} className="mb-4 last:mb-0">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">
                    {product.description}
                    <br />
                    (同業他社で導入実績あり)
                  </p>
                  <p className="mt-2">価格: {product.price}</p>
                  <p>使用期間: {product.usagePeriod}</p>
                </div>
              ))}
              {category.products.map((product) => (
                <div key={product.name} className="mb-4 last:mb-0">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="mt-2">価格: {product.price}</p>
                  <p>使用期間: {product.usagePeriod}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
