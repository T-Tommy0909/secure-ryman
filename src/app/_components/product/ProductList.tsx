"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Product {
  name: string;
  description: string;
  price: string;
  usagePeriod: string;
}

interface Category {
  name: string;
  products: Product[];
}

export default function ProductCatalog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

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
}

// データフェッチのためのモック関数
async function fetchCategories(): Promise<Category[]> {
  const userIndustry = await fetchUserIndustry();
  return [
    {
      name: `${userIndustry}業界で利用されている商品`,
      products: [
        {
          name: "セキュリティソフトA",
          description: "メール・Web閲覧・第三者からのウイルス対策を行うソフト",
          price: "¥30,000 / 年",
          usagePeriod: "1年間",
        },
      ],
    },
    {
      name: "ID系サービス",
      products: [
        {
          name: "IDマネージャー",
          description: "複数のIDを一元管理するサービス",
          price: "¥5,000 / 月",
          usagePeriod: "1ヶ月から",
        },
      ],
    },
    // 他のカテゴリーを追加...
  ];
}

async function fetchUserIndustry(): Promise<string> {
  // APIコールをシミュレート
  return "製造";
}
