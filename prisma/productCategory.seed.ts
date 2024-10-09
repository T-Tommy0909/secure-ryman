import { prisma } from "../src/server/utils/prisma";

export const createProductCategorySeed = async () => {
  await prisma.productCategory.createMany({
    data: [
      {
        name: "パスワード管理",
      },
      {
        name: "インターネットセキュリティ",
      },
      {
        name: "総合セキュリティサービス",
      },
      {
        name: "物理的対策",
      },
      {
        name: "その他の商品",
      },
    ],
    skipDuplicates: true,
  });
};
