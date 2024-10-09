import { NextPage } from "next";
import { Suspense } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import ProductList from "../_components/product/ProductList";
import { serverApi } from "../_trpc/server-api";

const ProductPage: NextPage = async () => {
  const session = await getSession();
  if (!session || !session.user.sub) {
    redirect("/api/auth/login");
  }

  // todo: userロールがordinaryだったら、エラーページにリダイレクト

  const productCategories = await serverApi.productCategorys.list({
    userId: session.user.sub,
  });
  if (!productCategories) {
    // todo: nullだったら、企業情報入力画面にリダイレクト
    redirect("/");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        導入実績のあるセキュリティ商品紹介
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList categories={productCategories} />
      </Suspense>
    </main>
  );
};

export default ProductPage;
