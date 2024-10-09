import { prisma } from "../src/server/utils/prisma";

export const createProductSeed = async () => {
  await prisma.product.create({
    data: {
      name: "商品1",
      description: "商品1の説明",
      price: "¥30,000 / 年",
      usagePeriod: "1年間",
      companyId: 1,
      categories: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: "商品2",
      description: "商品2の説明",
      price: "¥50,000 / 年",
      usagePeriod: "3年間",
      companyId: 2,
      categories: {
        connect: [{ id: 3 }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: "商品3",
      description: "商品3の説明",
      price: "¥100,000 / 年",
      usagePeriod: "5年間",
      companyId: 3,
      categories: {
        connect: [{ id: 4 }],
      },
    },
  });
};
