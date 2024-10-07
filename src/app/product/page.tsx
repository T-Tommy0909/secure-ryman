import { Suspense } from "react";
import ProductList from "../_components/product/ProductList";

export default function ProductPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        他社で導入実績のあるセキュリティ商品紹介
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </main>
  );
}
